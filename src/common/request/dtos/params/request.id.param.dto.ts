import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class RequestIdParamDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  id: number;
}
