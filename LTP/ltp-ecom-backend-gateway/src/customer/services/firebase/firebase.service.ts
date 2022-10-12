import { Injectable } from '@nestjs/common';
import {
  SocialAccountType,
  AuthenticateStatus,
  AuthenticateResultInterface,
} from './authenticate/base.authenticate';
import { FacebookAuthenticateDriver } from './authenticate/facebook.authenticate';
import { GoogleAuthenticateDriver } from './authenticate/google.authenticate';

@Injectable()
export class FirebaseService {
  constructor(
    private facebookAuthenticateDriver: FacebookAuthenticateDriver,
    private googleAuthenticateDriver: GoogleAuthenticateDriver,
  ) {}

  async verifySocialAccount(
    type: SocialAccountType,
    reqData: any,
  ): Promise<AuthenticateResultInterface> {
    let result: AuthenticateResultInterface = {
      status: AuthenticateStatus.FAIL,
      uid: '',
      email: '',
      name: '',
      phone_number: '',
      error: null,
    };
    if (!type || !reqData) {
      return result;
    }
    switch (type) {
      case SocialAccountType.FACEBOOK:
        result = await this.facebookAuthenticateDriver.verify(reqData);
        break;
      case SocialAccountType.GOOGLE:
        result = await this.googleAuthenticateDriver.verify(reqData);
        break;
    }

    return result;
  }
}
