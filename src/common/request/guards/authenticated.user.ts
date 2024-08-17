import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../exceptions/http.exception";
import { HttpStatusCode } from "../../constants/http.status.code.constant";
import requestConfig from "../config/request.config";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { USER_ROLE } from "../../constants/roles.constant";
import { REQUEST_META } from "../constants/request.constant";
import { AuthService } from "../../../modules/auth/services/auth.service";

export async function UserProtectedGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const _authService = AuthService.getInstance();
  try {
    //Extract token
    const incomingToken: string | undefined | string[] =
      req.headers.authorization?.split(" ");

    //If token is not found don't let user to get into the server
    if (!incomingToken) {
      throw new HttpException(HttpStatusCode.UNAUTHORIZED, "Not Authenticated");
    }

    //How Front will be requestion
    if (incomingToken.length > 0 && incomingToken[1] === "null") {
      console.log("Yes it is Null");
      throw new HttpException(HttpStatusCode.UNAUTHORIZED, "Not Authenticated");
    }

    const isBearer = incomingToken[0];

    if (isBearer !== "Bearer") {
      throw new HttpException(
        HttpStatusCode.FORBIDDEN,
        "Only Bearer Token is Accepted"
      );
    }

    const decodedToken: Jwt | JwtPayload | string =
      await _authService.decodeToken(
        incomingToken[1],
        requestConfig.secretKey!
      );

    const incomingUrlRequest = req.baseUrl.split("/")[1].toUpperCase();

    if (
      incomingUrlRequest === USER_ROLE.ADMIN &&
      decodedToken["userRole"] !== USER_ROLE.ADMIN
    ) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "User not permitted"
      );
    }
    if (
      incomingUrlRequest === USER_ROLE.USER &&
      decodedToken["userRole"] !== USER_ROLE.USER
    ) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "User not permitted"
      );
    }
    req[REQUEST_META.PROTECTED_USER] = decodedToken["id"];
    next();
  } catch (error) {
    next(error);
  }
}
