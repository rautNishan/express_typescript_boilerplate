import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class RequestListQueryDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === "true" ? true : false))
  withDeleted?: boolean;
}
