import { Router } from "express";
import { updateUser, getMe } from "../controller/user";

const userRouter = Router();

userRouter.get("/", getMe);
userRouter.patch("/", updateUser);

export default userRouter;
