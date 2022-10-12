import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
// import * as firebase from 'firebase-admin';

async function bootstrap() {
  // firebase.initializeApp({
  //   credential: firebase.credential.cert({
  //     privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  //     clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  //     projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  //   } as Partial<firebase.ServiceAccount>),
  // });
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors();

  // Setup Swagger if NODE_ENV === development
  const config = new DocumentBuilder()
    .setTitle('VIEF API')
    .setDescription('VIEF API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.PORT || 5000);
}
bootstrap();
