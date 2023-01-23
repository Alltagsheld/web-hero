import { Request, Response } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import catchAsync from "../util/catchAsync";

export const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ status: "unauthorized" });
  }

  const userRepository = await getRepository(User);
  const user = await userRepository.findOneOrFail({
    where: { id: req.user.id },
    relations: ["badges"],
  });

  user.password = undefined;

  res.status(200).send({
    status: "success",
    data: user,
  });
});

export const updateUser = async (req: Request, res: Response) => {
  const userUpdate = req.body.user;
  const UserRepository = getRepository(User);

  try {
    const userRepository = await getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { id: userUpdate.id },
      relations: ["badges"],
    });

    if (!user) {
      res.status(404).send({
        status: "error",
        message: "Not authenticated",
      });
      return;
    }

    console.log("req.Body", userUpdate);

    //checken ob die updatebaren Attribute gesetzt sind
    /*if (name != null) {
      user.name = name;
    }*/
    Object.entries(userUpdate).forEach(([key, value]) => {
      if (value != null) {
        user[key] = value;
      }
    });

    await UserRepository.save(user);

    user.password = undefined;

    res.status(200).send({
      status: "success",
      updatedUser: user,
    });
  } catch (error) {
    res.status(404).send({
      status: "error",
      message: "User can not be updated",
    });
  }
};
