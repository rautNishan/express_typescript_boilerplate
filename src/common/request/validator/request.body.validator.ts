import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../exceptions/validation.exception";
import { HttpStatusCode } from "../../constants/http.status.code.constant";

export function RequestBodyValidation(
  type: any
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const incomingObject: any = plainToInstance(type, req.body);
    const errorArray: any[] = [];
    validate(incomingObject)
      .then((error) => {
        if (error.length > 0) {
          for (let err of error) {
            errorArray.push(err.constraints);
          }
          throw new ValidationException(
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            errorArray
          );
        } else {
          //Every thing is alright
          req.body = incomingObject;
          next();
        }
      })
      .catch((error) => next(error));
  };
}
