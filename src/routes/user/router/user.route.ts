import express, { Request, Response, Router } from "express";
import { RequestBodyValidation } from "../../../common/request/validator/request.body.validator";
import { UserLoginDoc } from "../../../modules/auth/docs/auth.user.doc";
import { UserController } from "../../../modules/users/controllers/user.controller";
import { UserCreateDto } from "../../../modules/users/dtos/user.create.dto";
import { asyncHandler } from "../../../utils/async.handler";
import {
  UserListDoc,
  UserRegisterDoc,
} from "../../../modules/users/docs/user.doc";
import { RequestQueryValidator } from "../../../common/request/validator/request.query.validator";
import { RequestListQueryDto } from "../../../common/request/dtos/query/request.list.query.dto";
import { RESPONSE_META } from "../../../common/response/constants/response.constant";

export class UserSelfRoute {
  constructor() {}

  static userRouter: Router = express.Router();

  public static getUserSelfRouter(): Router {
    this.register("/register");
    this.list("/list");
    return this.userRouter;
  }

  @UserRegisterDoc()
  public static register(path: string): Router {
    const userController: UserController = new UserController();
    return this.userRouter.post(
      path,
      RequestBodyValidation(UserCreateDto),
      asyncHandler(async (req: Request, res: Response) => {
        const incomingData = req.body;
        const createdData = await userController.create(incomingData);
        res.json(createdData);
      })
    );
  }

  @UserListDoc()
  public static list(path: string): Router {
    const userController: UserController = new UserController();
    return this.userRouter.get(
      path,
      RequestQueryValidator(RequestListQueryDto),
      asyncHandler(async (req: Request, res: Response) => {
        const data = await userController.getAll(req.query);
        res[RESPONSE_META.RESPONSE_MESSAGE] = "Get List Successfully";
        res.json(data);
      })
    );
  }
}
