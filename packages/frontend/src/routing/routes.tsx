import { ReactElement } from "react";
import { Environment } from "src/pages/Environment/Environment";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { Login } from "../pages/Login/Login";
import SignUp from "src/pages/SignUp/SignUp";
import { HeroBase } from "src/pages/HeroBase/HeroBase";
import { TaskOverview } from "src/pages/TaskOverview/TaskOverview";
import { EndOfChallenge } from "src/pages/EndOfChallenge/EndOfChallenge";
import { Character } from "src/pages/Character/Character";

export type pathsWithoutParams = "/" | "/login" | "/signUp";

export interface pathsWithParams {
  "/challenge-environment/:taskId": "taskId";
  "/:userId/character": "userId";
  "/:userId/ark-board": "userId";
  "/:userId/:title/:challengeId/questBoard": "userId" | "title" | "challengeId";
  "/challenge-environment/:taskId/success": "taskId";
}

export type paths = pathsWithoutParams | keyof pathsWithParams;

export interface RouteInterface {
  path: paths;
  page: ReactElement;
}

export const routes: RouteInterface[] = [
  {
    path: "/",
    page: <LandingPage />,
  },
  {
    path: "/login",
    page: <Login />,
  },
  {
    path: "/signUp",
    page: <SignUp />,
  },
  {
    path: "/:userId/ark-board",
    page: <HeroBase />,
  },
  {
    path: "/:userId/character",
    page: <Character />,
  },
  {
    path: "/:userId/:title/:challengeId/questBoard",
    page: <TaskOverview />,
  },
  {
    path: "/challenge-environment/:taskId",
    page: <Environment />,
  },
  {
    path: "/challenge-environment/:taskId/success",
    page: <EndOfChallenge />,
  },
];
