import express, { Request, Response, Router } from "express";
import { UserAuthRoute } from "./router/user.auth.route";
import { UserSelfRoute } from "./router/user.route";

export class UserIndexRoute {
  static userRouter: Router = express.Router();

  public static getUserRouter(): Router {
    //Auth Route
    this.userRouter = UserAuthRoute.getUserAuthRouter();
    this.userRouter = UserSelfRoute.getUserSelfRouter();

    //User Route
    return this.userRouter;
  }
}
