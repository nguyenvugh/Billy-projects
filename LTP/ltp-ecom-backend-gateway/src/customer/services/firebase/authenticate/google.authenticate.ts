import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  AuthenticateStatus,
  AuthenticateError,
  AuthenticateResultInterface,
  AuthenticateDriverInterface,
} from './base.authenticate';

@Injectable()
export class GoogleAuthenticateDriver implements AuthenticateDriverInterface {
  constructor(private configService: ConfigService) {
    try {
      const config = this.configService.get<any>('firebase.config');
      // Initialize
      //firebase.initializeApp(config);
      firebase.initializeApp(config);
    } catch (error) {}
  }

  async verify(data: any): Promise<AuthenticateResultInterface> {
    const result: AuthenticateResultInterface = {
      status: AuthenticateStatus.FAIL,
      uid: '',
      email: '',
      name: '',
      phone_number: '',
      error: null,
    };

    const { oauthIdToken, oauthAccessToken, uid } = data;
    if (!oauthIdToken || !oauthAccessToken || !uid) {
      result.error = AuthenticateError.BAD_REQUEST;
      return result;
    }
    return new Promise((resolve) => {
      try {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          oauthIdToken,
          oauthAccessToken,
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((rs) => {
            const user = rs.user;
            if (user && user.uid == uid) {
              result.status = AuthenticateStatus.OK;
              result.uid = user.uid;
              result.email = user.email;
              result.name = user.displayName;
              result.phone_number = user.phoneNumber;
            } else {
              result.error = AuthenticateError.WRONG_UID;
            }
            resolve(result);
          })
          .catch((error) => {
            result.error = error;
            resolve(result);
          });
      } catch (error) {
        result.error = error;
        resolve(result);
      }
    });
  }
}
