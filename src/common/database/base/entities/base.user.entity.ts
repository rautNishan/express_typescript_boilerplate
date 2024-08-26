import { Column } from "typeorm";
import { USER_ROLE } from "../../../constants/roles.constant";
import { IBaseUser } from "../../interfaces/database.interface";
import { DataBaseBaseEntity } from "./base.entity";

export class BaseUserEntity extends DataBaseBaseEntity implements IBaseUser {
  @Column({
    name: "password",
    type: "varchar",
    length: 250,
    nullable: false,
  })
  password: string;

  @Column({
    name: "role",
    type: "varchar",
    length: 250,
    nullable: false,
  })
  role: USER_ROLE;

  @Column({
    type: "text",
    unique: true,
    name: "user_name",
    nullable: false,
  })
  userName: string;
}
