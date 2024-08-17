import jwt, {
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  TokenExpiredError,
  VerifyOptions,
} from "jsonwebtoken";

import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import {
  IAuth,
  ICreateTokenData,
  ILoginIncomingData,
} from "../interfaces/auth.interface";
import { DBConnection } from "../../../common/database/connection/database.connection";
import requestConfig from "../../../common/request/config/request.config";
import { HttpException } from "../../../common/exceptions/http.exception";
import { HttpStatusCode } from "../../../common/constants/http.status.code.constant";
import { UserEntity } from "../../users/entity/user.entity";
import { UserRepository } from "../../users/repository/user.repository";

export class AuthService implements IAuth {
  private static _instance: AuthService;

  private _repo: Repository<UserEntity>;

  private _userRepository: UserRepository;

  private constructor() {
    this._repo = DBConnection.getConnection().getRepository(UserEntity);
    this._userRepository = new UserRepository(this._repo);
  }

  public static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }

  async login(incomingData: ILoginIncomingData): Promise<string> {
    try {
      const validUser: UserEntity = await this.verifyValidUser(incomingData);
      await this.verifyPassword(incomingData.password, validUser.password);
      const payLoad: ICreateTokenData = this.preparePayload(validUser);

      return await this.createToken(payLoad, requestConfig.secretKey!, {
        expiresIn: "1d",
      });
    } catch (error) {
      throw error;
    }
  }

  async createToken(
    payload: ICreateTokenData,
    secretKey: Secret,
    options?: SignOptions
  ): Promise<string> {
    return jwt.sign(payload, secretKey, options);
  }

  async decodeToken(
    token: string,
    secretKey: Secret,
    options?: VerifyOptions
  ): Promise<Jwt | JwtPayload | string> {
    try {
      const type = jwt.verify(token, secretKey, options);
      return type;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException(HttpStatusCode.UNAUTHORIZED, "Not Authorized");
      }
      throw error;
    }
  }

  async verifyPassword(
    incomingPassword: string,
    dbPassword: string
  ): Promise<void> {
    const isPasswordCorrect: boolean = await bcrypt.compare(
      incomingPassword,
      dbPassword
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "Invalid Credential"
      );
    }
  }

  async verifyValidUser(incomingData: ILoginIncomingData) {
    let existingUser: UserEntity | null = null;

    if (incomingData.email) {
      existingUser = await this._userRepository.getOne({
        options: { where: { email: incomingData.email } },
      });
    }

    if (incomingData.userName) {
      existingUser = await this._userRepository.getOne({
        options: { where: { userName: incomingData.userName } },
      });
    }

    if (!existingUser) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, "User does not exists");
    }

    return existingUser;
  }

  preparePayload(validUser: UserEntity): ICreateTokenData {
    return {
      id: validUser.id,
      userName: validUser.userName,
      userRole: validUser.role,
    };
  }
}
