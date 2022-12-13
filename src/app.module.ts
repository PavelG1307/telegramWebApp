import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { getEnvFilePath } from './core/utils';
import { CompanyModule } from './features/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: getEnvFilePath()
  }),
    CompanyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
