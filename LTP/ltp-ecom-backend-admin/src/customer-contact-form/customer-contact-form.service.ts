import { Injectable } from '@nestjs/common';
import { FindAllCustomerContactFormsDto } from './dto/find-all-customer-contact-forms.dto';
import { DeleteMultiCustomerContactFormsDto } from './dto/delete-multi-customer-contact-forms.dto';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { CustomerContactFormRepository } from './repository/customer-contact-form.repository';

@Injectable()
export class CustomerContactFormService {
  constructor(private customerContactFormRepo: CustomerContactFormRepository) {}

  async findAllCustomerContactForms(reqData: FindAllCustomerContactFormsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    let query = this.customerContactFormRepo
      .createQueryBuilder('inventory')
      .orderBy({
        created_at: 'DESC',
      })
      .skip(offset)
      .take(limit);
    if (reqData.search) {
      query = query.where('email LIKE :email', {
        email: `%${reqData.search}%`,
      });
    }
    const [results, count] = await query.getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    return { results, total: count, max_page: maxPage };
  }

  async deleteMultiCustomerContactForms(
    reqData: DeleteMultiCustomerContactFormsDto,
  ) {
    await this.customerContactFormRepo.delete(reqData.ids);
    return 'Đã xóa thành công';
  }
}
