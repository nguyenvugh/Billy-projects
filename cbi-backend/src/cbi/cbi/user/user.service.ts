import { Injectable } from '@nestjs/common';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { parseOffsetAndLimit } from '../../../common/helpers/paginate.helper';
import { GetCbisDto as UserGetCbisDto } from './dto/request/get-cbis.dto';
import { CbiRepository } from '../repository/cbi.repository';

@Injectable()
export class UserService {
  constructor(private cbiRepo: CbiRepository) {}

  async getCbis(reqData: UserGetCbisDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [results, total] = await this.cbiRepo
      .createQueryBuilder('cbi')
      .innerJoinAndSelect('cbi.thumbnail', 'cbi_thumbnail')
      .innerJoin(
        'cbi.levels',
        'cbi_levels',
        'cbi_levels.status_publish = :status_publish',
        {
          status_publish: BooleanStatusEnum.TRUE,
        },
      )
      // TODO: using created_by relationship
      .orderBy({
        'cbi.name': 'ASC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return { results, total };
  }
}
