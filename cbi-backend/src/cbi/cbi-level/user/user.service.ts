import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { DATE_TIME_CONST } from '../../../common/constants/datetime.constant';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import { calculateDiffFromTimestampToCurrentTimestamp } from '../../../common/helpers/datetime.helper';
import { validateUserCanSubmitOneCbiLevelAnswer } from '../../../cbi-user/cbi-user-level/helper/cbi-user-level.helper';
import { CbiRepository } from '../../cbi/repository/cbi.repository';
import { CbiLevelRepository } from '../repository/cbi-level.repository';
import { CbiLevelEntity } from '../entity/cbi-level.entity';
import { CbiUserLevelRepository } from '../../../cbi-user/cbi-user-level/repository/cbi-user-level.repository';
import { CbiUserLevelEntity } from '../../../cbi-user/cbi-user-level/entity/cbi-user-level.entity';
import { CbiUserEntity } from '../../../cbi-user/cbi-user/entity/cbi-user.entity';

@Injectable()
export class UserService {
  constructor(
    private cbiRepo: CbiRepository,
    private cbiLevelRepo: CbiLevelRepository,
    private cbiUserLevelRepo: CbiUserLevelRepository,
  ) {}

  async getCbiLevelsOfCbi(cbiId: any, userId: any) {
    if (!cbiId || !userId) {
      throw new BadRequestExc();
    }
    const [cbiUserLevelsSubmittedGet, cbiLevelsInCbiGet] = await Promise.all([
      this.cbiUserLevelRepo
        .createQueryBuilder('cbi_user_level')
        .innerJoinAndSelect(
          'cbi_user_level.cbi_user',
          'cbi_user_level_cbi_user',
          'cbi_user_level_cbi_user.user_id = :user_id AND cbi_user_level_cbi_user.cbi_id = :cbi_id',
          {
            user_id: userId,
            cbi_id: cbiId,
          },
        )
        .getMany(),
      this.cbiLevelRepo
        .createQueryBuilder('cbi_level')
        .where({
          cbi_id: cbiId,
          status_publish: BooleanStatusEnum.TRUE,
        })
        .orderBy({
          level: 'ASC',
        })
        .getMany(),
    ]);

    return this.generateResponseGetCbiLevelsOfCbi(
      cbiLevelsInCbiGet,
      cbiUserLevelsSubmittedGet,
    );
  }

  async getCbiLevelsOfCbiSlug(cbiSlug: string, userId: any) {
    if (!cbiSlug || !userId) {
      throw new BadRequestExc();
    }
    const [cbiUserLevelsSubmittedGet, cbiLevelsInCbiGet] = await Promise.all([
      this.cbiUserLevelRepo
        .createQueryBuilder('cbi_user_level')
        .innerJoinAndSelect(
          'cbi_user_level.cbi_user',
          'cbi_user_level_cbi_user',
          'cbi_user_level_cbi_user.user_id = :user_id',
          {
            user_id: userId,
          },
        )
        .innerJoin(
          'cbi_user_level_cbi_user.cbi',
          'cbi_user_level_cbi_user_cbi',
          'cbi_user_level_cbi_user_cbi.slug = :cbi_slug',
          {
            cbi_slug: cbiSlug,
          },
        )
        .getMany(),
      this.cbiLevelRepo
        .createQueryBuilder('cbi_level')
        .innerJoin(
          'cbi_level.cbi',
          'cbi_level_cbi',
          'cbi_level_cbi.slug = :cbi_slug',
          {
            cbi_slug: cbiSlug,
          },
        )
        .where({
          status_publish: BooleanStatusEnum.TRUE,
        })
        .orderBy({
          level: 'ASC',
        })
        .getMany(),
    ]);

    return this.generateResponseGetCbiLevelsOfCbi(
      cbiLevelsInCbiGet,
      cbiUserLevelsSubmittedGet,
    );
  }

  private generateResponseGetCbiLevelsOfCbi(
    cbiLevelsInCbiGet: CbiLevelEntity[],
    cbiUserLevelsSubmittedGet: CbiUserLevelEntity[],
  ) {
    if (!cbiLevelsInCbiGet.length) {
      return { results: [] };
    }
    const resReturn: any = {
      results: [],
    };
    if (cbiUserLevelsSubmittedGet.length) {
      const cbiUserSubmitted: CbiUserEntity =
        cbiUserLevelsSubmittedGet[0].cbi_user;
      if (
        BooleanStatusEnum.FALSE == cbiUserSubmitted.status_pass &&
        cbiUserSubmitted.time_to_test_again
      ) {
        resReturn['time_to_test_again'] =
          calculateDiffFromTimestampToCurrentTimestamp(
            cbiUserSubmitted.time_to_test_again,
            '',
            DATE_TIME_CONST.UNIT_TIMES.DAYS,
          );
      }
    }
    for (const cbiLevelInCbiGet of cbiLevelsInCbiGet) {
      const canTest = validateUserCanSubmitOneCbiLevelAnswer(
        cbiLevelsInCbiGet,
        cbiUserLevelsSubmittedGet,
        cbiLevelInCbiGet.id,
      );
      resReturn['results'].push({
        ...cbiLevelInCbiGet,
        can_test: canTest ? BooleanStatusEnum.TRUE : BooleanStatusEnum.FALSE,
      });
    }

    return resReturn;
  }
}
