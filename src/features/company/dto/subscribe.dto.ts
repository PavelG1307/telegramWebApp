import { Transform } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class SubscribeDto {
    @IsNotEmpty()
    @Transform(() => Number)
    userId: number

    @IsNotEmpty()
    companyUUID: string
}

export class UnsubscribeDto {
    @IsNotEmpty()
    @Transform(() => Number)
    userId: number

    @IsNotEmpty()
    companyUUID: string
}