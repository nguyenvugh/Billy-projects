import { Module } from '@nestjs/common';
import { MyAccountService } from './my-account.service';
import { MyAccountController } from './my-account.controller';
import { MicroserviceModule } from '../microservice/microservice.module';
import { FirebaseModule } from '../services/firebase/firebase.module';

@Module({
  imports: [MicroserviceModule, FirebaseModule],
  controllers: [MyAccountController],
  providers: [MyAccountService],
})
export class MyAccountModule {}
