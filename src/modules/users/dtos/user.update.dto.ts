import { IsOptional, IsString, MaxLength } from "class-validator";

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(250)
  password: string;
}
