import { NextFunction, Request, Response } from "express";
import { DatabaseException } from "../../exceptions/database.exception";
import { HttpException } from "../../exceptions/http.exception";
import { ValidationException } from "../../exceptions/validation.exception";
import { IExceptionResponse } from "../interfaces/response.interface";

export function GlobalExceptionFilter(
  err: HttpException | DatabaseException | ValidationException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const defaultStatusCode = 500;
  const defaultMessage: any = "Internal Server Error";

  const statusCode =
    err instanceof HttpException
      ? err.statusCode
      : err instanceof ValidationException
      ? err.statusCode
      : defaultStatusCode;
  const message =
    err instanceof HttpException
      ? err.message
      : err instanceof DatabaseException
      ? err.message
      : err instanceof ValidationException
      ? err.message
      : defaultMessage;

  const response: IExceptionResponse = {
    date: new Date(),
    path: req.baseUrl + req.path,
    statusCode,
    message,
  };
  console.log("This is Error: ", err);
  return res.status(statusCode).send(response);
}
