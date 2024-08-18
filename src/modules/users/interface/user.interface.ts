import {
  IBaseRepository,
  IFindOneOption,
} from "../../../common/database/interfaces/database.interface";

export interface IUser {
  email: string;
  contact: string;
}

export interface IUserService<T> extends IBaseRepository<T> {
  getByEmail(email: string, options: IFindOneOption<T>): Promise<T | null>;
  getByUserName(
    userName: string,
    options: IFindOneOption<T>
  ): Promise<T | null>;
}
