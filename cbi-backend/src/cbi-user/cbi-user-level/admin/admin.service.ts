import { Injectable } from '@nestjs/common';
import { In, Brackets, IsNull } from 'typeorm';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { DATE_TIME_CONST } from '../../../common/constants/datetime.constant';
import { TIME_TO_TEST_AGAIN_BY_MONTH } from '../../cbi-user/constant';
import { parseOffsetAndLimit } from '../../../common/helpers/paginate.helper';
import {
  validateDataAdminConfirmScoreOneCbiLevelAnswer,
  calculateTotalScoreOfDataAdminConfirmScoreOneCbiLevelAnswer,
  calculateTotalScoreOfDataUserSubmitOneCbiLevelAnswer,
} from '../helper/cbi-user-level.helper';
import {
  generateMapArrayDataWithKeyPair,
  generateMapDataWithKeyFieldPair,
} from '../../../common/utils';
import {
  convertTimestampStringToTimestampWithTimezoneString,
  modifyDateTimeFromCurrentTimestamp,
} from '../../../common/helpers/datetime.helper';
import {
  convertTotalScoresToTitleEarned,
  checkUserPassedCbi,
} from '../../cbi-user/helper/cbi-user.helper';
import { GetCbiUserLevelsDto } from './dto/request/get-cbi-user-levels.dto';
import { GetCbiUserLevelsNeedConfirmScoreDto } from './dto/request/get-cbi-user-levels-need-confirm-score.dto';
import { ConfirmScoreOneCbiUserLevelAnswerDto } from './dto/request/confirm-score-one-cbi-user-level-answer.dto';
import { CbiUserLevelRepository } from '../repository/cbi-user-level.repository';
import { CbiUserLevelEntity } from '../entity/cbi-user-level.entity';
import { CbiUserRepository } from '../../cbi-user/repository/cbi-user.repository';
import { CbiLevelRepository } from '../../../cbi/cbi-level/repository/cbi-level.repository';
import { CbiLevelGroupRepository } from '../../../cbi/cbi-level-group/repository/cbi-level-group.repository';
import { CbiUserQuestionAnswerRepository } from '../../cbi-user-question-answer/repository/cbi-user-question-answer.repository';
import { CbiUserQuestionAnswerEntity } from '../../cbi-user-question-answer/entity/cbi-user-question-answer.entity';

@Injectable()
export class AdminService {
  constructor(
    private cbiUserLevelRepo: CbiUserLevelRepository,
    private cbiLevelRepo: CbiLevelRepository,
    private cbiLevelGroupRepo: CbiLevelGroupRepository,
  ) {}

  async checkCbiLevelHasUserSubmit(cbiLevelId: any) {
    if (!cbiLevelId) {
      return true;
    }
    const cbiUserLevelSubmittedGet = await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .where({
        cbi_level_id: cbiLevelId,
      })
      .getOne();

    return cbiUserLevelSubmittedGet ? true : false;
  }

  async getListCbiLevelsHasUserSubmit(cbiLevelIds: any[]) {
    if (!cbiLevelIds.length) {
      return [];
    }
    return await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .where({
        cbi_level_id: In(cbiLevelIds),
      })
      .getMany();
  }

  async getCbiUserLevelsNeedConfirmScore(
    reqData: GetCbiUserLevelsNeedConfirmScoreDto,
  ) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const { search, from_date, to_date } = reqData;
    let queryBuilder = this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoinAndSelect('cbi_user_level.cbi_user', 'cbi_user_level_cbi_user')
      .innerJoinAndSelect(
        'cbi_user_level_cbi_user.cbi',
        'cbi_user_level_cbi_user_cbi',
      )
      .innerJoinAndSelect(
        'cbi_user_level_cbi_user.user',
        'cbi_user_level_cbi_user_user',
      )
      .innerJoinAndSelect(
        'cbi_user_level.cbi_level',
        'cbi_user_level_cbi_level',
      )
      .where(
        'cbi_user_level.status_finish = :status_finish AND cbi_user_level.status_admin_calculate_score = :status_admin_calculate_score',
        {
          status_finish: BooleanStatusEnum.TRUE,
          status_admin_calculate_score: BooleanStatusEnum.FALSE,
        },
      )
      .skip(offset)
      .take(limit)
      .orderBy({
        'cbi_user_level.created_at': 'ASC',
      });
    if (search) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('cbi_user_level_cbi_user_user.fullName LIKE :fullName', {
            fullName: `%${search}%`,
          }).orWhere('cbi_user_level_cbi_user_user.email LIKE :email', {
            email: `%${search}%`,
          });
        }),
      );
    }
    const fromDateStr = convertTimestampStringToTimestampWithTimezoneString(
      `${from_date} 00:00:00`,
      DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITHOUT_TIMEZONE,
    );
    if (fromDateStr) {
      queryBuilder = queryBuilder.andWhere(
        'cbi_user_level.created_at >= :from_date',
        {
          from_date: fromDateStr,
        },
      );
    }
    const toDateStr = convertTimestampStringToTimestampWithTimezoneString(
      `${to_date} 23:59:59`,
      DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITHOUT_TIMEZONE,
    );
    if (toDateStr) {
      queryBuilder = queryBuilder.andWhere(
        'cbi_user_level.created_at <= :to_date',
        {
          to_date: toDateStr,
        },
      );
    }
    const [results, total] = await queryBuilder.getManyAndCount();

    return { results, total };
  }

  async getCbiUserLevels(reqData: GetCbiUserLevelsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const {
      search,
      from_date,
      to_date,
      status_finish,
      status_admin_calculate_score,
    } = reqData;
    let queryBuilder = this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoinAndSelect('cbi_user_level.cbi_user', 'cbi_user_level_cbi_user')
      .innerJoinAndSelect(
        'cbi_user_level_cbi_user.cbi',
        'cbi_user_level_cbi_user_cbi',
      )
      .innerJoinAndSelect(
        'cbi_user_level_cbi_user.user',
        'cbi_user_level_cbi_user_user',
      )
      .innerJoinAndSelect(
        'cbi_user_level.cbi_level',
        'cbi_user_level_cbi_level',
      )
      .where('cbi_user_level.status_finish = :status_finish', {
        status_finish: BooleanStatusEnum.TRUE,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'cbi_user_level.status_admin_calculate_score = :status_admin_calculate_score',
            {
              status_admin_calculate_score: BooleanStatusEnum.TRUE,
            },
          ).orWhere({
            status_admin_calculate_score: IsNull(),
          });
        }),
      )
      .skip(offset)
      .take(limit)
      .orderBy({
        'cbi_user_level.created_at': 'DESC',
      });
    if (search) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('cbi_user_level_cbi_user_user.fullName LIKE :fullName', {
            fullName: `%${search}%`,
          })
            .orWhere('cbi_user_level_cbi_user_user.email LIKE :email', {
              email: `%${search}%`,
            })
            .orWhere('cbi_user_level_cbi_level.name LIKE :cbi_level_name', {
              cbi_level_name: `%${search}%`,
            })
            .orWhere('cbi_user_level_cbi_user_cbi.name LIKE :cbi_name', {
              cbi_name: `%${search}%`,
            });
        }),
      );
    }
    const fromDateStr = convertTimestampStringToTimestampWithTimezoneString(
      `${from_date} 00:00:00`,
      DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITHOUT_TIMEZONE,
    );
    if (fromDateStr) {
      queryBuilder = queryBuilder.andWhere(
        'cbi_user_level.created_at >= :from_date',
        {
          from_date: fromDateStr,
        },
      );
    }
    const toDateStr = convertTimestampStringToTimestampWithTimezoneString(
      `${to_date} 23:59:59`,
      DATE_TIME_CONST.FORMATS.FORMAT_TIMESTAMP_WITHOUT_TIMEZONE,
    );
    if (toDateStr) {
      queryBuilder = queryBuilder.andWhere(
        'cbi_user_level.created_at <= :to_date',
        {
          to_date: toDateStr,
        },
      );
    }
    if (status_finish) {
      queryBuilder = queryBuilder.andWhere(
        'cbi_user_level.status_finish = :status_finish',
        {
          status_finish: status_finish,
        },
      );
    }
    if (status_admin_calculate_score) {
      queryBuilder = queryBuilder.andWhere(
        'cbi_user_level.status_admin_calculate_score = :status_admin_calculate_score',
        {
          status_admin_calculate_score: status_admin_calculate_score,
        },
      );
    }
    const [results, total] = await queryBuilder.getManyAndCount();

    return { results, total };
  }

  async getCbiUserLevelNeedConfirmScore(cbiUserLevelId: any) {
    if (!cbiUserLevelId) {
      throw new BadRequestExc();
    }
    const cbiUserLevelGet = await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoinAndSelect(
        'cbi_user_level.cbi_user_question_answers',
        'cbi_user_level_cbi_user_question_answers',
      )
      .where({
        id: cbiUserLevelId,
        status_finish: BooleanStatusEnum.TRUE,
        status_admin_calculate_score: BooleanStatusEnum.FALSE,
      })
      .getOne();
    if (!cbiUserLevelGet || !cbiUserLevelGet.cbi_user_question_answers.length) {
      throw new BadRequestExc();
    }
    const results = await this.getCbiLevelGroupsFullQuestions(cbiUserLevelGet);

    return { results };
  }

  async getCbiUserLevel(cbiUserLevelId: any) {
    if (!cbiUserLevelId) {
      throw new BadRequestExc();
    }
    const cbiUserLevelGet = await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoinAndSelect(
        'cbi_user_level.cbi_user_question_answers',
        'cbi_user_level_cbi_user_question_answers',
      )
      .where(
        'cbi_user_level.id = :cbi_user_level_id AND cbi_user_level.status_finish = :status_finish',
        {
          status_finish: BooleanStatusEnum.TRUE,
          cbi_user_level_id: cbiUserLevelId,
        },
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'cbi_user_level.status_admin_calculate_score = :status_admin_calculate_score',
            {
              status_admin_calculate_score: BooleanStatusEnum.TRUE,
            },
          ).orWhere({
            status_admin_calculate_score: IsNull(),
          });
        }),
      )
      .getOne();
    if (!cbiUserLevelGet || !cbiUserLevelGet.cbi_user_question_answers.length) {
      throw new BadRequestExc();
    }
    const results = await this.getCbiLevelGroupsFullQuestions(cbiUserLevelGet);

    return { results };
  }

  async confirmScoreOneCbiUserLevel(
    cbiUserLevelId: any,
    reqData: ConfirmScoreOneCbiUserLevelAnswerDto,
  ) {
    if (!cbiUserLevelId) {
      throw new BadRequestExc();
    }
    const cbiUserLevelGet = await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoinAndSelect('cbi_user_level.cbi_user', 'cbi_user_level_cbi_user')
      .innerJoinAndSelect(
        'cbi_user_level.cbi_user_question_answers',
        'cbi_user_level_cbi_user_question_answers',
      )
      .where({
        id: cbiUserLevelId,
        status_finish: BooleanStatusEnum.TRUE,
        status_admin_calculate_score: BooleanStatusEnum.FALSE,
      })
      .getOne();
    if (!cbiUserLevelGet || !cbiUserLevelGet.cbi_user_question_answers.length) {
      throw new BadRequestExc();
    }
    if (
      false ==
      validateDataAdminConfirmScoreOneCbiLevelAnswer(
        cbiUserLevelGet.cbi_user_question_answers,
        reqData.answers,
      )
    ) {
      throw new BadRequestExc();
    }
    const cbiId = cbiUserLevelGet.cbi_user.cbi_id;
    const cbiLevelId = cbiUserLevelGet.cbi_level_id;
    const [cbiUserLevelsSubmittedGet, cbiLevelsInCbiGet] = await Promise.all([
      this.cbiUserLevelRepo
        .createQueryBuilder('cbi_user_level')
        .innerJoinAndSelect(
          'cbi_user_level.cbi_user',
          'cbi_user_level_cbi_user',
          'cbi_user_level_cbi_user.cbi_id = :cbi_id',
          {
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
    if (!cbiLevelsInCbiGet.length) {
      throw new BadRequestExc();
    }
    const mapCbiUserLevelsSubmittedByCbiLevelId =
      generateMapDataWithKeyFieldPair(
        'cbi_level_id',
        '',
        cbiUserLevelsSubmittedGet,
      );
    let isCbiConfirmedAllLevelsScore: boolean = true;
    // Check with other cbi levels submitted
    if (cbiUserLevelsSubmittedGet.length) {
      for (const cbiLevelInCbiGet of cbiLevelsInCbiGet) {
        // Only check with other cbi levels
        if (cbiLevelId == cbiLevelInCbiGet.id) {
          continue;
        }
        // Exists other cbi level not submit
        if (
          false ==
          mapCbiUserLevelsSubmittedByCbiLevelId.hasOwnProperty(
            cbiLevelInCbiGet.id,
          )
        ) {
          isCbiConfirmedAllLevelsScore = false;
          break;
        }
        const cbiCbiUserLevelSubmitted: CbiUserLevelEntity =
          mapCbiUserLevelsSubmittedByCbiLevelId[cbiLevelInCbiGet.id];
        if (BooleanStatusEnum.TRUE == cbiLevelInCbiGet.auto_calculate_score) {
          if (
            BooleanStatusEnum.FALSE == cbiCbiUserLevelSubmitted.status_finish
          ) {
            isCbiConfirmedAllLevelsScore = false;
            break;
          }
        } else {
          if (
            BooleanStatusEnum.FALSE == cbiCbiUserLevelSubmitted.status_finish ||
            BooleanStatusEnum.FALSE ==
              cbiCbiUserLevelSubmitted.status_admin_calculate_score
          ) {
            isCbiConfirmedAllLevelsScore = false;
            break;
          }
        }
      }
    }
    const totalScoreCbiUserLevel =
      calculateTotalScoreOfDataUserSubmitOneCbiLevelAnswer(reqData.answers);
    const dataSaveCbiUser: any = {
      id: cbiUserLevelGet.cbi_user_id,
    };
    let dataSaveCbiUserLevel: any = {
      id: cbiUserLevelGet.id,
      total_scores: totalScoreCbiUserLevel,
      status_admin_calculate_score: BooleanStatusEnum.TRUE,
      // TODO: set relation updated_at
    };
    let totalScoreCbiUser = totalScoreCbiUserLevel;
    let countCbiUserLevelFinishedSubmit = 1;
    if (cbiUserLevelsSubmittedGet.length) {
      for (const cbiUserLevelSubmittedGet of cbiUserLevelsSubmittedGet) {
        if (cbiLevelId != cbiUserLevelSubmittedGet.cbi_level_id) {
          totalScoreCbiUser += Number(cbiUserLevelSubmittedGet.total_scores);
          // Because we validated only allow submit a cbi level when all previous cbi levels finished
          // We don't need check status_finish of other cbi user levels submitted
          countCbiUserLevelFinishedSubmit++;
        }
      }
    }
    dataSaveCbiUser['total_scores'] = totalScoreCbiUser;
    // Finished all cbi levels
    if (countCbiUserLevelFinishedSubmit == cbiLevelsInCbiGet.length) {
      // Confirmed all cbi levels
      if (true == isCbiConfirmedAllLevelsScore) {
        dataSaveCbiUser['title_earned'] =
          convertTotalScoresToTitleEarned(totalScoreCbiUser);
        dataSaveCbiUser['status_pass'] = checkUserPassedCbi(totalScoreCbiUser)
          ? BooleanStatusEnum.TRUE
          : BooleanStatusEnum.FALSE;
        if (BooleanStatusEnum.FALSE == dataSaveCbiUser['status_pass']) {
          dataSaveCbiUser['time_to_test_again'] =
            modifyDateTimeFromCurrentTimestamp(
              TIME_TO_TEST_AGAIN_BY_MONTH,
              DATE_TIME_CONST.UNIT_TIMES.MONTHS,
            );
        }
      }
    }
    const result = await this.cbiUserLevelRepo.manager.transaction(
      async (entityManager) => {
        const cbiUserRepo =
          entityManager.getCustomRepository(CbiUserRepository);
        const cbiUserLevelRepo = entityManager.getCustomRepository(
          CbiUserLevelRepository,
        );
        const cbiUserQuestionAnswerRepo = entityManager.getCustomRepository(
          CbiUserQuestionAnswerRepository,
        );
        await Promise.all([
          cbiUserRepo.save(dataSaveCbiUser, {
            transaction: false,
          }),
          cbiUserLevelRepo.save(dataSaveCbiUserLevel, {
            transaction: false,
          }),
          cbiUserQuestionAnswerRepo.save(reqData.answers, {
            transaction: false,
          }),
        ]);

        return true;
      },
    );
    return;
  }

  private async getCbiLevelGroupsFullQuestions(
    cbiUserLevelGet: CbiUserLevelEntity,
  ) {
    if (!cbiUserLevelGet) {
      return [];
    }
    const results = await this.cbiLevelGroupRepo
      .createQueryBuilder('cbi_level_group')
      .leftJoinAndSelect(
        'cbi_level_group.questions',
        'cbi_level_group_questions',
      )
      .leftJoinAndSelect(
        'cbi_level_group_questions.options',
        'cbi_level_group_questions_options',
      )
      .leftJoinAndSelect(
        'cbi_level_group_questions_options.values',
        'cbi_level_group_questions_options_values',
      )
      .where({
        cbi_level_id: cbiUserLevelGet.cbi_level_id,
      })
      .orderBy({
        'cbi_level_group.order_display': 'ASC',
        'cbi_level_group_questions.order_display': 'ASC',
        'cbi_level_group_questions_options.order_display': 'ASC',
        'cbi_level_group_questions_options_values.order_display': 'ASC',
      })
      .getMany();
    if (!results.length) {
      throw new BadRequestExc();
    }
    const mapCbiUserQuestionAnswersSubmittedByQuestionId: any =
      generateMapArrayDataWithKeyPair(
        'cbi_question_id',
        cbiUserLevelGet.cbi_user_question_answers,
      );
    for (let i = 0; i < results.length; i++) {
      const group = results[i];
      for (let j = 0; j < group.questions.length; j++) {
        const question = group.questions[j];
        if (
          true ==
          mapCbiUserQuestionAnswersSubmittedByQuestionId.hasOwnProperty(
            question.id,
          )
        ) {
          const cbiUserQuestionAnswerSubmitted: CbiUserQuestionAnswerEntity[] =
            mapCbiUserQuestionAnswersSubmittedByQuestionId[question.id];
          const mapCbiUserQuestionAnswersSubmittedByOptionId =
            generateMapArrayDataWithKeyPair(
              'cbi_question_option_id',
              cbiUserQuestionAnswerSubmitted,
            );
          for (let k = 0; k < question.options.length; k++) {
            const option = question.options[k];
            if (
              true ==
              mapCbiUserQuestionAnswersSubmittedByOptionId.hasOwnProperty(
                option.id,
              )
            ) {
              const cbiUserQuestionOptionAnswerSubmitted: CbiUserQuestionAnswerEntity[] =
                mapCbiUserQuestionAnswersSubmittedByOptionId[option.id];
              results[i].questions[j].options[k]['answers'] =
                cbiUserQuestionOptionAnswerSubmitted;
            }
          }
        }
      }
    }

    return results;
  }
}
