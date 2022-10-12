import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import winstonConfig from './common/configs/winston';
import { AllExceptionsFilter } from './common/exceptions/all.exception';
import { BadRequestExc } from './common/exceptions/custom.exception';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.use(json({ limit: '1mb' }));
  // Setup CORS
  app.enableCors({
    origin: '*',
    /*allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',*/
    methods: 'GET,PUT,POST,DELETE,UPDATE,PATCH',
    credentials: true,
  });
  // Setup helmet to run with HTTPS API server
  const serverRunWithHttps =
    process.env.SERVER_RUN_WITH_HTTPS &&
    'true' == process.env.SERVER_RUN_WITH_HTTPS
      ? true
      : false;
  if (false === serverRunWithHttps) {
    app.use(
      helmet({
        hsts: false,
        contentSecurityPolicy: false,
      }),
    );
  } else {
    app.use(helmet());
  }

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // transformOptions: { excludeExtraneousValues: true },
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        // console.log('errors on Pipe', errors);
        return new BadRequestExc();
      },
    }),
  );
  // Setup handle exception
  app.useGlobalFilters(new AllExceptionsFilter());
  // Setup version of API server
  app.setGlobalPrefix('v1');
  // Setup swagger
  const swaggerIsDisabled =
    process.env.SWAGGER_DISABLE && 'true' == process.env.SWAGGER_DISABLE
      ? true
      : false;
  if (false === swaggerIsDisabled) {
    const swaggerAccessUrl = process.env.SWAGGER_URL || 'api';
    const options = new DocumentBuilder()
      .setTitle('LTP API Gateway')
      .setDescription('LTP API Gateway')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerAccessUrl, app, document);
  }
  // Run API server
  await app.listen(parseInt(process.env.SERVER_PORT, 10) || 5000);
}
bootstrap();
