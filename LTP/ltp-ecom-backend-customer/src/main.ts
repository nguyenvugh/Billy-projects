import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_HOST || '127.0.0.1',
        port: parseInt(process.env.SERVER_PORT, 10) || 50001,
      },
    },
  );
  app.listen(() => console.log('Microservice customer is listening'));
  /*
  // Init app
  const app = await NestFactory.create(AppModule);
  // Create services host and port
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.SERVICE_HOST || '127.0.0.1',
      port: parseInt(process.env.SERVER_PORT, 10) || 50001,
    },
  });
  app.startAllMicroservicesAsync();

  // Check server run with scheduler mode
  const serverRunOnScheduleMode =
    process.env.SERVER_ENABLE_SCHEDULE_MODE &&
    'true' == process.env.SERVER_ENABLE_SCHEDULE_MODE
      ? true
      : false;
  if (false === serverRunOnScheduleMode) {
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
    // Setup version of API server
    app.setGlobalPrefix('v1');
    // Run API server
    await app.listen(parseInt(process.env.SERVER_PORT, 10) || 50001);
  }
  */
}
bootstrap();
