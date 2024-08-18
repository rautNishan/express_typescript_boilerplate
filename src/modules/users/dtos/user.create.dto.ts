import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { USER_ROLE } from "../../../common/constants/roles.constant";

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  password: string;

  role?: USER_ROLE;
}
