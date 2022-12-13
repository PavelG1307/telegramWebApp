import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { CompanyService } from "./company.service"

@ApiTags('Компании')
@Controller('company')
export class CompanyController {
  constructor(private readonly CompanyService: CompanyService) { }

  @ApiOperation({ summary: 'Get list company' })
  @Get()
  async get() {
    return this.CompanyService.get()
  }

}