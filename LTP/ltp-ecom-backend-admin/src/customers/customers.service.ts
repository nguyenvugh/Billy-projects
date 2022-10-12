import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import {
  CustomerAddressDefaultConst,
  CustomerStatusConst,
} from 'src/common/constants/customer.constant';
import HashHelper from 'src/common/helpers/hash.helper';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { UpdateCustomersDto } from './dto/update.dto';
import { CustomersAddressesRepository } from './repositories/customers-addresses.repository';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly customersAddressesRepository: CustomersAddressesRepository,
    private readonly hashHelper: HashHelper,
  ) { }

  async findByCriteria(findRequest): Promise<any> {
    try {
      const { email, phone_number, status } = findRequest;
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const conditions = {};
      if (status) {
        if (!this.validateStatus(status).value) {
          return this.validateStatus(status).error;
        } else {
          conditions['status'] = status;
        }
      }
      const [results, totalRecords] =
        await this.customersRepository.findAndCount({
          relations: ['addresses', 'avatar_obj'],
          order: {
            created_at: 'DESC',
          },
          where: (qb) => {
            if (email || phone_number || status) {
              qb.where({ ...conditions });
              if (email) {
                qb.andWhere('email like :email', {
                  email: `%${email}%`,
                });
              }
              if (phone_number) {
                qb.andWhere('phone_number like :phone_number', {
                  phone_number: `%${phone_number}%`,
                });
              }
            }
          },
          skip: offset,
          take: limit,
        });
      return {
        results,
        totalRecords,
      };
    } catch (err) {
      return {
        results: [],
        totalRecords: 0,
      };
    }
  }

  async deactivate(id: number, lock_reason: string): Promise<any> {
    const customer = await this.customersRepository.findOne(id);
    if (customer) {
      await this.customersRepository.save({
        id,
        status: CustomerStatusConst.INACTIVATED,
        lock_reason,
      });
      return {
        code: 200,
        message: 'Customer deactivated successfully',
      };
    } else {
      return {
        code: 404,
        message: 'Customer not found',
      };
    }
  }

  async activate(id: number): Promise<any> {
    const customer = await this.customersRepository.findOne(id);
    if (customer) {
      await this.customersRepository.save({
        id,
        status: CustomerStatusConst.ACTIVATED,
      });
      return {
        code: 200,
        message: 'Customer activated successfully',
      };
    } else {
      return {
        code: 404,
        message: 'Customer not found',
      };
    }
  }

  async findOne(id: number): Promise<any> {
    const customer = await this.customersRepository.findOne(id, {
      relations: [
        'addresses',
        'avatar_obj',
        'addresses.country',
        'addresses.city',
        'addresses.district',
        'addresses.ward',
      ],
    });
    if (customer) {
      return {
        code: 200,
        data: customer,
      };
    } else {
      return {
        code: 404,
        message: 'Customer not found',
      };
    }
  }

  async update(body: UpdateCustomersDto): Promise<any> {
    const {
      id,
      fullname,
      avatar,
      sex,
      birthday,
      country,
      city,
      district,
      ward,
      address,
      password,
    } = body;
    const customer = await this.customersRepository.findOne(id);
    if (customer) {
      const payload = {
        id,
        name: fullname,
        sex,
        birthday,
        avatar,
      };
      if (password && password !== '') {
        payload['password'] = await this.hashHelper.hashPassword(password);
      }
      await this.customersRepository.save(payload);
      const customerAddress = await this.customersAddressesRepository.findOne({
        where: {
          customer: id,
          is_default: CustomerAddressDefaultConst.DEFAULT,
        },
      });
      const customerAddressPayload = {
        name: fullname,
        phone_number: customer?.phone_number,
        countryId: country,
        cityId: city,
        districtId: district,
        wardId: ward,
        address,
        alias: '',
      };
      if (customerAddress) {
        customerAddressPayload['id'] = customerAddress.id;
      } else {
        customerAddressPayload['customerId'] = id;
        customerAddressPayload['is_default'] = CustomerAddressDefaultConst.DEFAULT;
      }
      await this.customersAddressesRepository.save(customerAddressPayload);
      return {
        code: 200,
        message: 'Update user successfully',
      };
    } else {
      return {
        code: 404,
        message: 'Customer not found',
      };
    }
  }

  async delete(id: number) {
    const customer = await this.customersRepository.findOne(id);
    if (customer) {
      customer.deleted_at = new Date();
      customer.deleted = DeletedConst.DELETED;
      await this.customersRepository.save(customer);
      return {
        code: 200,
        message: 'Customer deleted successfully',
      };
    } else {
      const errorCode = 'customer::002';
      return {
        code: 404,
        errorCode,
        message: 'Customer not found',
      };
    }
  }

  private validateStatus(status: CustomerStatusConst) {
    if (status) {
      const statuses = Object.keys(CustomerStatusConst);
      if (statuses.includes(status + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'news::004';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            // message: NewsErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'news::003';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          // message: NewsErrorCodes[errorCode],
        },
      };
    }
  }
}
