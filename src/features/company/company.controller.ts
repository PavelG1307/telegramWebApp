import { Controller, Get, Post, Query } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { CompanyService } from "./company.service"
import { GetCompaniesDto, SubscribeDto, UnsubscribeDto } from "./dto"

@ApiTags('Компании')
@Controller('company')
export class CompanyController {
  constructor(private readonly CompanyService: CompanyService) { }

  @ApiOperation({ summary: 'Get list company' })
  @Get()
  async get(@Query() query: GetCompaniesDto) {
    return this.CompanyService.get(query.userId)
  }

  @Post('subscribe')
  async subscribe(@Query() query: SubscribeDto) {
    return this.CompanyService.subscribe(query.companyUUID, query.userId)
  }

  @Post('unsubscribe')
  async unsubscribe(@Query() query: UnsubscribeDto) {
    return this.CompanyService.unsubscribe(query.companyUUID, query.userId)
  }
}