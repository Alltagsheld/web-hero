import { Router } from "express";
import { getQuests } from "../controller/quest";

const questRouter = Router();

questRouter.get("/quests", getQuests);
export default questRouter;
