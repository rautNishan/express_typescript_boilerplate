import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ILoginIncomingData } from "../interfaces/auth.interface";

export class UserLoginDto implements ILoginIncomingData {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  password: string;
}
