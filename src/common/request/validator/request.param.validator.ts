import { plainToInstance } from "class-transformer";
import { Validate, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../../exceptions/validation.exception";
import { HttpStatusCode } from "../../constants/http.status.code.constant";

export function RequestParamValidator(
  type: any
): (req: Request, res: Response, next?: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomingParam: any = await plainToInstance(type, req.params);
      const validation = await validate(incomingParam);
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
      req.params = incomingParam;
      next();
    } catch (error) {
      next(error);
    }
  };
}
