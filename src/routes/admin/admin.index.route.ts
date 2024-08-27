import express, { Router } from "express";
import { AdminUserRoute } from "./router/admin.user.route";

export class AdminIndexRouter {
  static adminRouter: Router = express.Router();

  public static getAdminRouter(): Router {
    AdminIndexRouter.adminRouter = AdminUserRoute.getAdminUserRouter();

    return AdminIndexRouter.adminRouter;
  }
}
