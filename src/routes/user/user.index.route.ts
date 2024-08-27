import express, { Router } from "express";
import { UserAuthRoute } from "./router/user.auth.route";
import { UserSelfRoute } from "./router/user.route";

export class UserIndexRoute {
  static userRouter: Router = express.Router();

  public static getUserRouter(): Router {
    //Auth Route
    UserIndexRoute.userRouter = UserAuthRoute.getUserAuthRouter();
    UserIndexRoute.userRouter = UserSelfRoute.getUserSelfRouter();

    //User Route
    return UserIndexRoute.userRouter;
  }
}
