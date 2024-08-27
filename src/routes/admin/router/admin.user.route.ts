// Routes for Admin to manage users

import express, { Router, Request, Response } from "express";
import { UserController } from "../../../modules/users/controllers/user.controller";
import { RequestBodyValidation } from "../../../common/request/validator/request.body.validator";
import { UserCreateDto } from "../../../modules/users/dtos/user.create.dto";
import { asyncHandler } from "../../../utils/async.handler";
import { AdminUserRegisterDoc } from "../../../modules/users/docs/admin/admin.user.doc";

export class AdminUserRoute {
  constructor() {}

  static userAdminRouter: Router = express.Router();
  public static getAdminUserRouter(): Router {
    //initializing routers
    AdminUserRoute.userAdminRouter = this.register('/user/register');
    return AdminUserRoute.userAdminRouter;
  }

  @AdminUserRegisterDoc()
  public static register(path: string): Router {
    const userController: UserController = new UserController();
    return this.userAdminRouter.post(
      path,
      RequestBodyValidation(UserCreateDto),
      asyncHandler(async (req: Request, res: Response) => {
        const incomingData = req.body;
        const createdData = await userController.create(incomingData);
        res.json(createdData);
      })
    );
  }
}
