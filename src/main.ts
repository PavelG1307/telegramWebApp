import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './core/config/cors';
import { EXIT_CODES } from './core/constants';
import { initSwagger } from './core/lib/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors(corsOptions)
    app.setGlobalPrefix(process.env.API_PREFIX)

    app.use(compression())
    app.use(helmet())

    initSwagger(app)

    await app.listen(process.env.PORT || 3000)
  } catch (error) {
    console.error(`Error occured: ${error.message}`)
    process.exit(EXIT_CODES.FAILED)
  }
}
bootstrap();
function compression(): any {
  throw new Error('Function not implemented.');
}

function helmet(): any {
  throw new Error('Function not implemented.');
}

