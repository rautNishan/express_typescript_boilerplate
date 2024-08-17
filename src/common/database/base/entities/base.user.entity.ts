import { Column } from "typeorm";
import { DataBaseBaseEntity } from "./base.entity";
import { USER_ROLE } from "../../../constants/roles.constant";
import { IBaseUser } from "../../interfaces/database.interface";

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
    length: 250,
    nullable: false,
  })
  userName: string;
}
