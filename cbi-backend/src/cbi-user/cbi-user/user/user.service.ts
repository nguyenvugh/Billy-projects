import { Injectable } from '@nestjs/common';
import { Brackets, MoreThan } from 'typeorm';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { parseOffsetAndLimit } from '../../../common/helpers/paginate.helper';
import { ProfileGetCbiUsersSubmitted } from './dto/request/profile-get-cbi-users-submitted.dto';
import { CbiUserRepository } from '../repository/cbi-user.repository';

@Injectable()
export class UserService {
  constructor(private cbiUserRepo: CbiUserRepository) {}

  async profileGetCbiUsersSubmitted(
    userId: any,
    reqData: ProfileGetCbiUsersSubmitted,
  ) {
    if (!userId) {
      throw new BadRequestExc();
    }
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [results, total] = await this.cbiUserRepo
      .createQueryBuilder('cbi_user')
      .innerJoin(
        'cbi_user.cbi_user_levels',
        'cbi_user_cbi_user_levels',
        'cbi_user_cbi_user_levels.status_finish = :status_finish',
        {
          status_finish: BooleanStatusEnum.TRUE,
        },
      )
      .innerJoinAndSelect('cbi_user.cbi', 'cbi_user_cbi')
      .innerJoin('cbi_user_cbi.levels', 'cbi_user_cbi_levels')
      .where('cbi_user.user_id = :user_id', {
        user_id: userId,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'cbi_user_cbi_levels.auto_calculate_score = :auto_calculate_score_true',
            {
              auto_calculate_score_true: BooleanStatusEnum.TRUE,
            },
          ).orWhere(
            'cbi_user_cbi_levels.auto_calculate_score = :auto_calculate_score_false AND cbi_user_cbi_user_levels.status_admin_calculate_score = :status_admin_calculate_score',
            {
              auto_calculate_score_false: BooleanStatusEnum.FALSE,
              status_admin_calculate_score: BooleanStatusEnum.TRUE,
            },
          );
        }),
      )
      .orderBy({
        'cbi_user.created_at': 'ASC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { results, total };
  }

  async checkUserCanOpenSpecialCbi(userId: any) {
    if (!userId) {
      return false;
    }
    const result = await this.cbiUserRepo
      .createQueryBuilder('cbi_user')
      .where({
        status_pass: BooleanStatusEnum.TRUE,
        total_scores: MoreThan(80),
        user_id: userId,
      })
      .getOne();

    return result ? true : false;
  }
}
