import { INestApplication } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger'

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Telegram notification app')
    .setVersion('1.0.0')
    .setDescription('Уведомления о новых сообщениях')
    .addTag('Reviews app')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup(process.env.API_PREFIX + '/docs', app, document)
}
