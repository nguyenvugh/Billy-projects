import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { FacebookAuthenticateDriver } from './authenticate/facebook.authenticate';
import { GoogleAuthenticateDriver } from './authenticate/google.authenticate';

@Module({
  controllers: [FirebaseController],
  providers: [
    FirebaseService,
    FacebookAuthenticateDriver,
    GoogleAuthenticateDriver,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
