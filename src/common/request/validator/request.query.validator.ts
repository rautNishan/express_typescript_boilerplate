import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../exceptions/validation.exception";
import { HttpStatusCode } from "../../constants/http.status.code.constant";
import { containsKey } from "../../../utils/key.contains";

export function RequestQueryValidator(
  type: ClassConstructor<any>
): (req: Request, res: Response, next?: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instance = new type();
      const whiteList: Boolean = containsKey(instance, req.query);

      if (!whiteList) {
        throw new ValidationException(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          "Cannot accept more properties than required"
        );
      }
      const incomingQuery: any = plainToInstance(type, req.query);
      const validation = await validate(incomingQuery);
      const errors: any = [];
      if (validation.length > 0) {
        for (let error of validation) {
          errors.push(error.constraints);
        }
        throw new ValidationException(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          errors
        );
      }
      req.query = incomingQuery;
      next();
    } catch (error) {
      next(error);
    }
  };
}
