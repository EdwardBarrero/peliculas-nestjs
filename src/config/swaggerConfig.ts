import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const config = new DocumentBuilder()
  .setTitle('Movies NestJS API')
  .setDescription('The movies API description')
  .setVersion('1.0')
  .build();

export const options: SwaggerDocumentOptions = {
  //   include: [Movie, Genr, MoviesGenrs],
  // operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  //   extraModels: [],
  //   deepScanRoutes: true,
};

export function generateSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}
