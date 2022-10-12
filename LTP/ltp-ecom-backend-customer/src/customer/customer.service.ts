import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Not } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { RpcExc } from '../common/exceptions/custom.exception';
import { CustomerSocialAccountActionConst } from '../common/constants/customer-social-account.constant';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GetCustomerProfileDto } from './dto/get-customer-profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { IntergrateSocialAccountDto } from './dto/intergrate-social-account.dto';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerConnectSocialRepository } from './repository/customer-connect-social.repository';

@Injectable()
export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private customerConnectSocialRepository: CustomerConnectSocialRepository,
    private i18n: I18nService,
    private configService: ConfigService,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  async findOne(id: number) {
    return await this.customerRepository.findOne(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  async getCustomerProfile(reqData: GetCustomerProfileDto) {
    const [customers, notFoundMsg] = await Promise.all([
      this.customerRepository.find({
        where: {
          id: reqData.customer,
        },
        relations: ['avatar', 'customer_socials'],
        take: 1,
      }),
      this.i18n.t('customer.validate.not_found'),
    ]);
    if (!customers || !customers.length) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }

    return customers[0];
  }

  async updateCustomerProfile(reqData: UpdateCustomerProfileDto) {
    // Check customer exists
    const [customer, notFoundMsg] = await Promise.all([
      this.customerRepository.findOne(reqData.customer),
      this.i18n.t('customer.validate.not_found'),
    ]);
    if (!customer) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    // Check email or phone number exists
    let customerGet = null;
    const [customersGet, emailExistedMsg, phoneNumberExistedMsg] =
      await Promise.all([
        this.customerRepository.find({
          where: [
            {
              email: reqData.email,
              id: Not(reqData.customer),
            },
            {
              phone_number: reqData.phone_number,
              id: Not(reqData.customer),
            },
          ],
          take: 1,
          select: ['phone_number', 'email'],
        }),
        this.i18n.t('customer.email.existed'),
        this.i18n.t('customer.phone_number.existed'),
      ]);
    if (customersGet && customersGet.length) {
      customerGet = customersGet[0];
    }
    if (customerGet) {
      if (reqData.email == customerGet.email) {
        throw new RpcExc(`conflict:${emailExistedMsg}`);
      }
      if (reqData.phone_number == customerGet.phone_number) {
        throw new RpcExc(`conflict:${phoneNumberExistedMsg}`);
      }
    }
    // Update
    delete reqData.customer;
    await this.customerRepository.save({
      id: customer.id,
      ...reqData,
    });
    return await this.getCustomerProfile({
      customer: customer.id,
    });
  }

  async intergrateCustomerSocialAccount(reqData: IntergrateSocialAccountDto) {
    const { action, customer, social_id, social_type } = reqData;
    // Check customer exists
    const [customerGet, notFoundMsg] = await Promise.all([
      this.customerRepository.findOne(customer),
      this.i18n.t('customer.validate.not_found'),
    ]);
    if (!customerGet) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    switch (action) {
      case CustomerSocialAccountActionConst.CONNECT:
        // Check had social connection
        const [
          checkSocialAccSameCustomer,
          checkSocialAccOtherCustomer,
          existedMsg,
        ] = await Promise.all([
          this.customerConnectSocialRepository.find({
            where: {
              customerId: customer,
              social_type,
            },
            take: 1,
          }),
          this.customerConnectSocialRepository.find({
            where: {
              social_id,
              social_type,
              customerId: Not(customer),
            },
            take: 1,
          }),
          this.i18n.t('customer-connect-social.validate.existed'),
        ]);
        if (
          (checkSocialAccSameCustomer && checkSocialAccSameCustomer.length) ||
          (checkSocialAccOtherCustomer && checkSocialAccOtherCustomer.length)
        ) {
          throw new RpcExc(`conflict:${existedMsg}`);
        }
        await this.customerConnectSocialRepository.save({
          customerId: customer,
          social_type,
          social_id,
        });
        break;
      case CustomerSocialAccountActionConst.DISCONNECT:
        await this.customerConnectSocialRepository.delete({
          customerId: customer,
          social_type,
          social_id,
        });
        break;
    }
    return await this.getCustomerProfile({
      customer: customer,
    });
  }

  async updateCustomerPassword(reqData: UpdateCustomerPasswordDto) {
    const salt: number = +this.configService.get('other.salt');
    const [customers, oldPassNotMatchMsg] = await Promise.all([
      this.customerRepository.find({
        where: {
          id: reqData.customer,
        },
        take: 1,
        select: ['id', 'password'],
      }),
      this.i18n.t('customer.password.not_match'),
    ]);
    if (!customers || !customers.length) {
      throw new RpcExc(`bad_request:${oldPassNotMatchMsg}`);
    }
    const customer = customers[0];
    const isMatch = await bcrypt.compare(
      reqData.old_password,
      customer.password,
    );
    if (!isMatch) {
      throw new RpcExc(`bad_request:${oldPassNotMatchMsg}`);
    }
    await this.customerRepository.save({
      id: customer.id,
      password: reqData.new_password,
    });
    return this.getCustomerProfile({
      customer: reqData.customer,
    });
  }
}
