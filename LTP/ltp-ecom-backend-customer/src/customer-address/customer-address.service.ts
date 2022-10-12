import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Not } from 'typeorm';
import { CustomerAddressDefault } from '../common/constants/customer-address.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import { DeletedConst } from '../common/constants/soft-delete.constant';
import { FindAllCustomerAddressesDto } from './dto/find-all-customer-addresses.dto';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { CustomerAddressRepository } from './repository/customer-address.repository';
import { SetCustomerDefaultAddressDto } from './dto/set-customer-default-address.dto';
import { DeleteOneCustomerAddressDto } from './dto/delete-one-customer-address.dto';

@Injectable()
export class CustomerAddressService {
  constructor(
    private customerAddressRepository: CustomerAddressRepository,
    private i18n: I18nService,
  ) {}

  async findAll(reqData: FindAllCustomerAddressesDto) {
    const results = await this.customerAddressRepository
      .createQueryBuilder('customer_address')
      .leftJoinAndSelect('customer_address.country', 'customer_address_country')
      .leftJoinAndSelect('customer_address.city', 'customer_address_city')
      .leftJoinAndSelect(
        'customer_address.district',
        'customer_address_district',
      )
      .leftJoinAndSelect('customer_address.ward', 'customer_address_ward')
      .where({
        customerId: reqData.customer,
      })
      .orderBy({
        'customer_address.created_at': 'ASC',
      })
      .getMany();

    return results;
  }

  async createOne(data: CreateCustomerAddressDto) {
    return await this.customerAddressRepository.save(data);
  }

  async updateOne(data: UpdateCustomerAddressDto) {
    // Check update condition
    const customerAddressGet = await this.customerAddressRepository.find({
      where: {
        id: data.id,
        customerId: data.customerId,
      },
      take: 1,
    });
    if (!customerAddressGet || !customerAddressGet.length) {
      const errMsg = await this.i18n.t('customer-address.validate.not_found');
      throw new RpcExc(`not_found:${errMsg}`);
    }

    return await this.customerAddressRepository.save(data);
  }

  async setDefaultAddress(data: SetCustomerDefaultAddressDto) {
    const [notDefaultAddress, defaultAddress] = await Promise.all([
      this.customerAddressRepository.update(
        {
          id: Not(data.id),
        },
        {
          is_default: CustomerAddressDefault.NOT_DEFAULT,
        },
      ),
      this.customerAddressRepository.save({
        id: data.id,
        is_default: CustomerAddressDefault.DEFAULT,
      }),
    ]);
    return defaultAddress;
  }

  async softDeleteOneCustomerAddress(data: DeleteOneCustomerAddressDto) {
    const [deletedCustomerAddress, deletedMsg] = await Promise.all([
      this.customerAddressRepository.softDelete(data.id),
      this.i18n.t('customer-address.message.deleted'),
    ]);
    if (deletedCustomerAddress) {
      await this.customerAddressRepository.save({
        id: data.id,
        deleted: DeletedConst.DELETED,
        deleted_by: data.customer,
      });
    }
    return {
      message: deletedMsg,
    };
  }
}
