import { EntityRepository, Repository, Not } from 'typeorm';
import { Customer } from '../schema/customer.schema';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  /**
   * Check email exists or not
   *
   * @method
   * @async
   * @public
   *
   * @param email - Email to check
   * @param idExclude
   * @returns boolean
   */
  async checkEmailExists(email: string, idExclude = 0) {
    let rs = true;
    if (!email) {
      return rs;
    }

    const conditions: any = {
      email: email,
    };
    if (idExclude) {
      conditions['id'] = Not(idExclude);
    }
    const rsCheck = await this.find({
      select: ['email'],
      where: conditions,
      take: 1,
    });
    rs = rsCheck && rsCheck.length ? true : false;

    return rs;
  }

  /**
   * Check phone number exists or not
   *
   * @method
   * @async
   * @public
   *
   * @param phoneNumber - Phone number to check
   * @param idExclude
   * @returns boolean
   */
  async checkPhoneNumberExists(phoneNumber: string, idExclude = 0) {
    let rs = true;
    if (!phoneNumber) {
      return rs;
    }

    const conditions: any = {
      phone_number: phoneNumber,
    };
    if (idExclude) {
      conditions['id'] = Not(idExclude);
    }
    const rsCheck = await this.find({
      select: ['phone_number'],
      where: conditions,
      take: 1,
    });
    rs = rsCheck && rsCheck.length ? true : false;

    return rs;
  }

  /**
   * Find one by email (using to check login)
   *
   * @method
   * @async
   * @public
   *
   * @param email
   * @returns
   */
  async findOneByEmail(email: string) {
    if (!email) {
      return null;
    }

    const customersGet: Customer[] = await this.find({
      where: {
        email: email,
      },
      select: [
        'id',
        'email',
        'name',
        'phone_number',
        'password',
        'sex',
        'birthday',
        'status',
      ],
      take: 1,
    });
    if (!customersGet || !customersGet.length) {
      return null;
    }
    const customerGet: Customer = customersGet[0];
    return customerGet;
  }
}
