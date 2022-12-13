import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
}