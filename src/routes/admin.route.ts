import express, { Request, Response, Router } from "express";
import { UserProtectedGuard } from "../common/request/guards/authenticated.user";
import { RequestBodyValidation } from "../common/request/validator/request.body.validator";
import { UserCreateDto } from "../modules/users/dtos/user.create.dto";
import { asyncHandler } from "../utils/async.handler";

import { AuthAdminController } from "../modules/auth/controllers/auth.admin.controller";
import { UserLoginDto } from "../modules/auth/dtos/user.login.dto";
import { UserAdminController } from "../modules/users/controllers/user.admin.controller";

export function adminRouterFactory(): Router {
  const adminRouter: Router = express.Router();

  // Auth ********************************************* Auth \\

  const authAdminController = new AuthAdminController();
  adminRouter.post(
    "/auth/login",
    RequestBodyValidation(UserLoginDto),
    asyncHandler(async (req: Request, res: Response) => {
      const incomingData = req.body;
      res.json(await authAdminController.login(incomingData));
    })
  );

  const userAdminController = new UserAdminController();

  // User ********************************************* User \\

  adminRouter.post(
    "/user/create",
    UserProtectedGuard,
    RequestBodyValidation(UserCreateDto),
    asyncHandler(async (req: Request, res: Response) => {
      return await userAdminController.create(req.body);
    })
  );

  return adminRouter;
}
