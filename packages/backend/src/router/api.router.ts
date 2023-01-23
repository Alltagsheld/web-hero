import { Request, Response, Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import { protect } from "../controller/auth";
import questRouter from "./quest.router";
import taskRouter from "./task.router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    version: "1.0.0",
    info: "API for Web-Hero.",
  });
});

router.use(authRouter);
router.use(protect);
router.use("/me", userRouter);
router.use(questRouter);
router.use(taskRouter);

export default router;
