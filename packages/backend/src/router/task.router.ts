import { Router } from "express";
import {
  getTasksByQuestId,
  getTaskFiles,
  getTaskById,
  updateTaskStatus,
  saveTaskRepo,
} from "../controller/task";

const taskRouter = Router();

taskRouter.get("/tasks", getTasksByQuestId);
taskRouter.get("/tasks/single", getTaskById);
taskRouter.get("/task/data", getTaskFiles);
taskRouter.patch("/task/patch", updateTaskStatus);
taskRouter.patch("/task/repo/patch", saveTaskRepo);

export default taskRouter;
