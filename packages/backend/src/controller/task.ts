import { Request, Response } from "express";
import { Task } from "../entity/Task";
import { getRepository } from "typeorm";
import { Quest } from "../entity/Quest";
import { Repo } from "../entity/Repo";
import catchAsync from "../util/catchAsync";
import { User } from "../entity/User";
import { Badge } from "../entity/Badge";

export const getTasksByQuestId = async (
  request: Request,
  response: Response
) => {
  const questId = request.query.questId;
  const questRepository = await getRepository(Quest);
  const taskRepository = await getRepository(Task);
  try {
    const quest = await questRepository.findOneOrFail({
      where: { id: questId },
    });
    const tasks = await taskRepository.find({
      where: { quest: quest },
      relations: ["quest", "labels"],
    });
    response.send({
      data: tasks,
    });
  } catch (error) {
    response.status(404).send({
      status: "not found",
    });
  }
};

export const getTaskById = async (request: Request, response: Response) => {
  const taskId = request.query.taskId;
  const taskRepository = await getRepository(Task);
  try {
    const task = await taskRepository
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.quest", "quest")
      .leftJoinAndSelect("task.labels", "labels")
      .where("task.id = :taskId", { taskId })
      .getOne();

    console.log(task);

    response.send({
      data: task,
    });
  } catch (error) {
    response.status(404).send({
      status: "not found",
    });
  }
};

export const getTaskFiles = async (request: Request, response: Response) => {
  const taskId = request.query.taskId;
  const taskRepository = await getRepository(Task);

  console.log("taskId", taskId);
  try {
    const files = await taskRepository
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.quest", "quest")
      .leftJoinAndSelect("task.testFiles", "testFiles")
      .leftJoinAndSelect("task.repoFiles", "repoFiles")
      .where("task.id = :taskId", { taskId })
      .getOne();

    response.send({
      data: files,
    });
  } catch (error) {
    response.status(404).send({
      status: "not found",
    });
  }
};

async function allTasksAreDone() {
  const taskRepository = await getRepository(Task);
  const allTasks = await taskRepository
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.quest", "quest")
    .getMany();

  let allTasksFinished = true;
  allTasks.forEach((task) => {
    if (task.finishedAt === null) {
      allTasksFinished = false;
    }
  });
  return allTasksFinished;
}

async function checkBadgeConditions(user: User) {
  const userId = user.id;
  const taskRepository = await getRepository(Task);
  const allTasks = await taskRepository
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.quest", "quest")
    .where("quest.userId = :userId", { userId })
    .getMany();

  const dates: Date[] = [];

  allTasks.forEach((task) => {
    if (task.finishedAt !== null) {
      dates.push(task.finishedAt);
    }
  });

  const newBadges = calculateBadges(userId, dates);
  return newBadges;
}

async function calculateBadges(userId, dates: Date[]) {
  const userRepository = await getRepository(User);
  const userToUpdate = await userRepository.findOneOrFail({
    where: { id: userId },
    relations: ["badges"],
  });

  const badgeRepository = await getRepository(Badge);

  let lastDate: Date;
  const badges: Badge[] = [];
  dates.forEach(async (date) => {
    if (lastDate && lastDate === date) {
      badges.push(
        await badgeRepository.findOneOrFail({
          where: { name: "Strong Arm" },
        })
      );
      //two challenges in a day
    }
    if (lastDate && new Date(lastDate.getDate() + 1) === date) {
      badges.push(
        await badgeRepository.findOneOrFail({
          where: { name: "True Hero" },
        })
      );
      //one challenge for two days in a row
    }
    lastDate = date;
  });
  if (dates) {
    badges.push(
      await badgeRepository.findOneOrFail({
        where: { name: "Legend in the making" },
      })
    );
    //solving the first challenge
  }
  if (userToUpdate.totalEp >= 8000) {
    badges.push(
      await badgeRepository.findOneOrFail({
        where: { name: "Warrior of Justice" },
      })
    );
    //received for first level up
  }
  //check which ones the user already has and remove them from the array
  /*console.log("old badge array", badges);
  userToUpdate.badges.forEach((badge) => {
    badges.forEach((newBadge) => {
      if (newBadge.id === badge.id) {
        //remove badge
        console.log("user already owns badge", badge);
        badges.splice(badges.indexOf(newBadge), 1);
      }
    });
  });*/
  userToUpdate.badges = badges;
  await userRepository.save(userToUpdate);
  return badges;
}

export async function saveUserProgress(user: User, task: Task) {
  const userRepository = await getRepository(User);
  const userToUpdate = await userRepository.findOneOrFail({
    where: { id: user.id },
  });

  userToUpdate.totalEp += task.gainedEP;

  //lower part didnt work
  task.labels.forEach((label) => {
    Object.keys(userToUpdate).forEach((key) => {
      if (key.includes(label.value.toLowerCase())) {
        userToUpdate[key] += task.gainedEP / task.labels.length;
      }
    });
  });
  await userRepository.save(userToUpdate);
}

export const updateTaskStatus = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ status: "unauthorized" });
    }
    const { taskId, status } = req.body;
    try {
      const taskRepository = await getRepository(Task);
      const task = await taskRepository.findOneOrFail({
        where: { id: taskId },
        relations: ["quest", "labels"],
      });

      let earnedBadges;
      if (task && status) {
        task.status = status.toString();

        if (task.status === "Done") {
          task.finishedAt = new Date();
          await taskRepository.save(task);

          await saveUserProgress(req.user, task);

          earnedBadges = await checkBadgeConditions(req.user);
          if (await allTasksAreDone()) {
            const questRepository = await getRepository(Quest);
            const quest = await questRepository.findOneOrFail({
              where: { id: task.quest.id },
            });
            quest.finishedAt = new Date();
            await questRepository.save(quest);
          }
          await taskRepository.save(task);
          res.status(200).send({
            status: "success",
            data: {
              earnedBadges: earnedBadges,
              task: task,
            },
          });
        }
      }
    } catch (error) {
      res.status(404).send({
        status: "not found",
      });
    }
  }
);

export const saveTaskRepo = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ status: "unauthorized" });
  }
  const { repoFiles } = req.body;

  try {
    const repoRepository = await getRepository(Repo);
    for (const file of repoFiles) {
      const updatedFile = await repoRepository.findOneOrFail({
        where: { id: file.id },
      });
      if (updatedFile.content !== file.content) {
        updatedFile.content = file.content;
        await repoRepository.save(updatedFile);
      }
    }
    res.status(200).send({
      status: "success",
    });
  } catch (error) {
    res.status(404).send({
      status: "not found",
    });
  }
});
