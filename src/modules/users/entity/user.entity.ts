import { Column } from "typeorm";
import { BaseUserEntity } from "../../../common/database/base/entities/base.user.entity";
import { IUser } from "../interface/user.interface";

export class UserEntity extends BaseUserEntity implements IUser {
  @Column({
    type: "text",
    name: "email",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
    name: "contact",
    nullable: false,
    unique: true,
  })
  contact: string;
}
