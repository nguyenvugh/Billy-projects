import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Raw } from 'typeorm';
import { RpcExc } from '../common/exceptions/custom.exception';
import { CustomerStatusConst } from '../common/constants/customer.constant';
import { Customer } from '../customer/schema/customer.schema';
import { CustomerRepository } from '../customer/repository/customer.repository';
import { CustomerConnectSocialRepository } from '../customer/repository/customer-connect-social.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { ForgetPasswordGenCodeDto } from './dto/forget-password-gen-code.dto';
import { ForgetPasswordSetNewPasswordDto } from './dto/forget-password-set-new-password.dto';
import { ConfirmActivationCodeDto } from './dto/confirm-activation-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private customerRepository: CustomerRepository,
    private customerConnectSocialRepository: CustomerConnectSocialRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private i18n: I18nService,
  ) {}

  async register(registerData: RegisterDto) {
    let customerGet: Customer = null;
    const customersGet = await this.customerRepository.find({
      where: [
        {
          email: registerData.email,
        },
        {
          phone_number: registerData.phone_number,
        },
      ],
      take: 1,
      select: ['id', 'activation_code', 'phone_number', 'email'],
    });
    /*const [customersGet, phoneNumberExisted] = await Promise.all([
      this.customerRepository.find({
        where: {
          email: registerData.email,
        },
        take: 1,
        select: ['activation_code', 'phone_number'],
      }),
      this.customerRepository.checkPhoneNumberExists(registerData.phone_number),
    ]);*/
    if (customersGet && customersGet.length) {
      customerGet = customersGet[0];
    }
    if (customerGet && !customerGet.activation_code) {
      if (registerData.email == customerGet.email) {
        const errMsg = await this.i18n.t('customer.email.existed');
        throw new RpcExc(`conflict:${errMsg}`);
      }
      if (registerData.phone_number == customerGet.phone_number) {
        const errMsg = await this.i18n.t('customer.phone_number.existed');
        throw new RpcExc(`conflict:${errMsg}`);
      }
    }

    const payload = {
      email: registerData.email,
    };
    const expireInSecond = this.configService.get<string>('jwt.expire');
    // Create token
    const code = this.jwtService.sign(payload);
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + parseInt(expireInSecond));

    const dataCreated: any = {
      ...registerData,
      activation_code: code,
      activation_expire: currentDate,
    };
    // Allow customer register multi times if not active account
    if (customerGet) {
      dataCreated['id'] = customerGet.id;
    }
    return await this.customerRepository.save(dataCreated);
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    const [customerGet, errMsg, notActiveMsg] = await Promise.all([
      this.customerRepository.findOneByEmail(email),
      this.i18n.t('auth.login.validate.wrong_information'),
      this.i18n.t('customer.validate.not_active'),
    ]);
    if (!customerGet) {
      throw new RpcExc(`unauthorize:${errMsg}`);
    }
    if (CustomerStatusConst.ACTIVE != customerGet.status) {
      throw new RpcExc(`unauthorize:${notActiveMsg}`);
    }
    const isMatch = await bcrypt.compare(password, customerGet.password);
    if (!isMatch) {
      throw new RpcExc(`unauthorize:${errMsg}`);
    }

    return customerGet;
  }

  async socialLogin(data: SocialLoginDto) {
    const { social_id, social_type, name, email, password, phone_number } =
      data;
    const [customer, notActiveMsg] = await Promise.all([
      this.customerRepository
        .createQueryBuilder('customer')
        .innerJoin(
          'customer.customer_socials',
          'customer_socials',
          'customer_socials.social_id = :social_id AND customer_socials.social_type = :social_type',
          {
            social_id,
            social_type,
          },
        )
        .take(1)
        .getOne(),
      this.i18n.t('customer.validate.not_active'),
    ]);
    if (customer) {
      if (CustomerStatusConst.ACTIVE != customer.status) {
        throw new RpcExc(`unauthorize:${notActiveMsg}`);
      }
      return customer;
    } else {
      const wheres: any[] = [];
      wheres.push({
        email,
      });
      if (phone_number) {
        wheres.push({
          phone_number,
        });
      }
      let dataCreate: any = {};
      let customerCreated = null;
      const [customersGet, emailExistedMsg, phoneExistedMsg] =
        await Promise.all([
          this.customerRepository.find({
            where: wheres,
            take: 1,
            relations: ['customer_socials'],
          }),
          this.i18n.t('customer.email.existed'),
          this.i18n.t('customer.phone_number.existed'),
        ]);
      if (customersGet && customersGet.length) {
        const customerGet = customersGet[0];
        /*if (email == customerGet.email) {
          throw new RpcExc(`conflict:${emailExistedMsg}`);
        }*/
        if (phone_number && phone_number == customerGet.phone_number) {
          throw new RpcExc(`conflict:${phoneExistedMsg}`);
        }
        customerGet.customer_socials.forEach((customerSocial) => {
          if (social_type == customerSocial.social_type) {
            throw new RpcExc(`conflict:${emailExistedMsg}`);
          }
        });
        await this.customerConnectSocialRepository.save({
          customerId: customerGet.id,
          social_id,
          social_type,
        });
        customerCreated = customerGet;
      } else {
        dataCreate = {
          name,
          email,
          password,
          status: CustomerStatusConst.ACTIVE,
          customer_socials: [
            {
              social_id,
              social_type,
            },
          ],
        };
        if (phone_number) {
          dataCreate.phone_number = phone_number;
        }
        customerCreated = await this.customerRepository.save(dataCreate);
      }
      if (!customerCreated) {
        throw new RpcExc(`bad_request:fail`);
      }
      return customerCreated;
    }
  }

  async forgetPasswordGenCode(data: ForgetPasswordGenCodeDto) {
    const payload = {
      email: data.email,
    };
    const expireInSecond = this.configService.get<string>('jwt.expire');
    // Find customer
    const [customer, errMsg] = await Promise.all([
      this.customerRepository.findOneByEmail(data.email),
      this.i18n.t('customer.validate.not_found'),
    ]);
    if (!customer) {
      throw new RpcExc(`not_found:${errMsg}`);
    }
    // Create token
    const code = this.jwtService.sign(payload);
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + parseInt(expireInSecond));
    await this.customerRepository.save({
      id: customer.id,
      reset_password_code: code,
      reset_password_expire: currentDate,
    });

    return {
      ...customer,
      reset_password_code: code,
    };
  }

  async forgetPasswordSetNewPass(data: ForgetPasswordSetNewPasswordDto) {
    const errMsg = await this.i18n.t('auth.forget_password.validate.fail');
    try {
      this.jwtService.verify(data.code);
    } catch (err) {
      throw new RpcExc(`bad_request:${errMsg}`);
    }
    const payload = this.jwtService.decode(data.code);
    if (!payload) {
      throw new RpcExc(`bad_request:${errMsg}`);
    }
    const customers: Customer[] = await this.customerRepository.find({
      where: {
        email: payload['email'],
        reset_password_code: data.code,
        reset_password_expire: Raw((alias) => `${alias} >= NOW()`),
      },
      take: 1,
    });
    if (!customers || !customers.length) {
      throw new RpcExc(`bad_request:${errMsg}`);
    }
    const customer: Customer = customers[0];
    await this.customerRepository.save({
      id: customer.id,
      password: data.password,
      reset_password_code: null,
      reset_password_expire: null,
    });

    return customer;
  }

  async confirmActivationCode(data: ConfirmActivationCodeDto) {
    const errMsg = await this.i18n.t(
      'auth.confirm_activation_code.validate.fail',
    );
    try {
      this.jwtService.verify(data.code);
    } catch (err) {
      throw new RpcExc(`bad_request:${errMsg}`);
    }
    const payload = this.jwtService.decode(data.code);
    if (!payload) {
      throw new RpcExc(`bad_request:${errMsg}`);
    }
    const customers: Customer[] = await this.customerRepository.find({
      where: {
        email: payload['email'],
        activation_code: data.code,
        activation_expire: Raw((alias) => `${alias} >= NOW()`),
      },
      take: 1,
    });
    if (!customers || !customers.length) {
      throw new RpcExc(`bad_request:${errMsg}`);
    }
    const customer: Customer = customers[0];
    await this.customerRepository.save({
      id: customer.id,
      status: CustomerStatusConst.ACTIVE,
      activation_code: null,
      activation_expire: null,
    });

    customer.status = CustomerStatusConst.ACTIVE;
    return customer;
  }

  test() {
    return 'test';
  }
}
