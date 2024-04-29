import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { generateSwagger } from './config/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
