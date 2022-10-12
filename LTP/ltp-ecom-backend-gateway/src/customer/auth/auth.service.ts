import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { MicroserviceConsts } from '../../common/constants/microservices';
import {
  InternalServerErrorExc,
  BadRequestExc,
} from '../../common/exceptions/custom.exception';
import { generateRandomPassword } from '../../common/helpers/util.helper';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { CustomerSocialLoginDto } from './dto/social-login.dto';
import { ForgetPasswordGenCodeDto } from './dto/forget-password-gen-code.dto';
import { ForgetPasswordSetNewPasswordDto } from './dto/forget-password-set-new-password.dto';
import { ConfirmActivationCodeDto } from './dto/confirm-activation-code.dto';
import { MicroserviceService } from '../microservice/microservice.service';
import { MailService } from '../../mail/mail.service';
import {
  AuthenticateStatus,
  AuthenticateResultInterface,
} from '../services/firebase/authenticate/base.authenticate';
import { FirebaseService } from '../services/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private microserviceService: MicroserviceService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
    private firebaseService: FirebaseService,
    private i18n: I18nService,
  ) {}

  async register(curLang: string, registerData: RegisterDto) {
    const result = await this.microserviceService.call(
      'customer-register',
      registerData,
    );
    // Send email
    if (result) {
      // TODO: check current lang
      const [subject] = await Promise.all([
        this.i18n.t('mail.customer.subject.confirm_email'),
      ]);
      const template = `${MicroserviceConsts.MAIL_TEMPLATE.CUSTOMER}_confirm_email.${curLang}`;
      const url = `${this.configService.get<string>(
        'web.customer.root',
      )}verify-email?token=${result.activation_code}`;
      await this.mailService.send(registerData.email, subject, template, {
        url: url,
        subscribe_url: '#',
        email: this.configService.get<string>('web.customer.email_support'),
        phone: this.configService.get<string>('web.customer.phone_support'),
      });
    }
    //return this.loginCustomer(result);
    return result;
  }

  async forgetPasswordGenCode(curLang: string, data: ForgetPasswordGenCodeDto) {
    const result = await this.microserviceService.call(
      'customer-forget-password-gen-code',
      data,
    );
    // Send email
    if (result) {
      // TODO: check current lang
      const [subject, errMsg] = await Promise.all([
        this.i18n.t('mail.customer.subject.forget_password'),
        this.i18n.t('auth.forget_password.validate.fail'),
      ]);
      const template = `${MicroserviceConsts.MAIL_TEMPLATE.CUSTOMER}_forget_password.${curLang}`;
      const url = `${this.configService.get<string>(
        'web.customer.root',
      )}?code=${result.reset_password_code}`;
      const emailSent = await this.mailService.send(
        data.email,
        subject,
        template,
        {
          name: result.name,
          url: url,
          email: this.configService.get<string>('web.customer.email_support'),
        },
      );
      if (!emailSent) {
        throw new InternalServerErrorExc(errMsg);
      }
    }

    return result;
  }

  async forgetPasswordSetNewPassword(data: ForgetPasswordSetNewPasswordDto) {
    const result = await this.microserviceService.call(
      'customer-forget-password-set-new-password',
      data,
    );

    return result;
  }

  async confirmActivationCode(data: ConfirmActivationCodeDto) {
    const result = await this.microserviceService.call(
      'customer-confirm-activation-code',
      data,
    );

    return this.loginCustomer(result);
  }

  async socialLogin(data: CustomerSocialLoginDto) {
    const { type, uid, oauthIdToken, oauthAccessToken } = data;
    const [rs, socialHasNotEmailMsg] = await Promise.all([
      this.firebaseService.verifySocialAccount(type, {
        oauthIdToken,
        oauthAccessToken,
        uid,
      }),
      this.i18n.t('auth.login.validate.social_account_has_not_email'),
    ]);
    const result: AuthenticateResultInterface = rs;
    if (AuthenticateStatus.FAIL == result.status) {
      throw new BadRequestExc();
    }
    if (!result.email) {
      throw new BadRequestExc(socialHasNotEmailMsg);
    }
    const dataLogin: any = {
      social_type: type,
      social_id: result.uid,
      name: result.name,
      email: result.email,
      password: generateRandomPassword(10),
    };
    if (result.phone_number) {
      result.phone_number = result.phone_number;
    }
    const rsLogin = await this.microserviceService.call(
      'customer-social-login',
      dataLogin,
    );
    return this.loginCustomer(rsLogin);
  }

  loginCustomer(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: MicroserviceConsts.TYPE_USERS.CUSTOMER,
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  /*
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  */
}
