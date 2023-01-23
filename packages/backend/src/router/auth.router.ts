import { Router } from "express";
import { login, logout, protect, signUp } from "../controller/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);
authRouter.post("/logout", protect, logout);
export default authRouter;
