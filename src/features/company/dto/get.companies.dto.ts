import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetCompaniesDto {
  @IsNotEmpty()
  @Transform(() => Number)
  userId: number
}