import { Jwt, JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { USER_ROLE } from "../../../common/constants/roles.constant";

export interface IAuth {
  login: (incomingData: ILoginIncomingData) => Promise<string>;
  createToken: (
    payload: ICreateTokenData,
    secretKey: Secret,
    options?: SignOptions
  ) => Promise<string>;
  decodeToken: (
    token: string,
    secretKey: Secret,
    options?: SignOptions
  ) => Promise<Jwt | JwtPayload | string>;

  verifyPassword: (
    incomingPassword: string,
    dbPassword: string
  ) => Promise<void>;
}

export interface ILoginIncomingData {
  userName?: string;
  email?: string;
  password: string;
}

export interface ICreateTokenData {
  id: number;
  userName: string;
  userRole: USER_ROLE;
}
