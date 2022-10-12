// dotenv must be on top of everything
// import 'dotenv/config'; // WORK
import * as dotenv from 'dotenv';
dotenv.config();
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/exceptions/all.exception';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validateCustomDecorators: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        // Can create custom class here.
        // return new BadRequestException(validationErrors);
        throw new BadRequestException();
      },
    }),
  );
  // Setup handle exception
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Headers, Accept-Language, lang',
    methods: 'GET,PUT,POST,DELETE,UPDATE,PATCH,OPTIONS,HEAD',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('CBI-OXFARM')
    .setDescription('Dormitory Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(+process.env.PORT || 5000);
}
bootstrap();
