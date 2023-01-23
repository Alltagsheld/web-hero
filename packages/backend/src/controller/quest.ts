import { Request, Response } from "express";
import catchAsync from "../util/catchAsync";
import { getRepository } from "typeorm";
import { Quest } from "../entity/Quest";

export const getQuests = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(404).send({
      status: "unauthorized",
      message: "Not authenticated",
    });
    return;
  }
  const user = req.user;
  const questRepository = getRepository(Quest);
  const quests = await questRepository.find({ where: { user: user } });

  quests.sort(dynamicSort("title"));

  res.status(200).send({
    status: "success",
    data: quests,
  });
});

function dynamicSort(property) {
  return function (a, b) {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  };
}
