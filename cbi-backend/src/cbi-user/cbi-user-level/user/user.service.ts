import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { TIME_TO_TEST_AGAIN_BY_MONTH } from '../../cbi-user/constant';
import { DATE_TIME_CONST } from '../../../common/constants/datetime.constant';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import {
  generateMapArrayDataWithKeyPair,
  generateMapDataWithKeyFieldPair,
} from '../../../common/utils';
import {
  validateUserCanSubmitOneCbiLevelAnswer,
  validateDataUserSubmitOneCbiLevelAnswer,
  calculateTotalScoreOfDataUserSubmitOneCbiLevelAnswer,
} from '../helper/cbi-user-level.helper';
import {
  convertTotalScoresToTitleEarned,
  checkUserPassedCbi,
} from '../../cbi-user/helper/cbi-user.helper';
import { modifyDateTimeFromCurrentTimestamp } from '../../../common/helpers/datetime.helper';
import { SubmitOneCbiUserLevelAnswerDto } from './dto/request/submit-one-cbi-user-level-answer.dto';
import { CbiUserQuestionAnswerRepository } from '../../cbi-user-question-answer/repository/cbi-user-question-answer.repository';
import { CbiUserQuestionAnswerEntity } from '../../cbi-user-question-answer/entity/cbi-user-question-answer.entity';
import { CbiUserLevelRepository } from '../repository/cbi-user-level.repository';
import { CbiUserLevelEntity } from '../entity/cbi-user-level.entity';
import { CbiUserRepository } from '../../cbi-user/repository/cbi-user.repository';
import { CbiUserEntity } from '../../cbi-user/entity/cbi-user.entity';
import { UserRepository } from '../../../auth/repository/user.repository';
import { CbiLevelRepository } from '../../../cbi/cbi-level/repository/cbi-level.repository';
import { CbiLevelEntity } from '../../../cbi/cbi-level/entity/cbi-level.entity';
import { AdminService as CbiLevelGroupAdminService } from '../../../cbi/cbi-level-group/admin/admin.service';
import { CbiLevelGroupRepository } from '../../../cbi/cbi-level-group/repository/cbi-level-group.repository';
import { CbiRepository } from '../../../cbi/cbi/repository/cbi.repository';

@Injectable()
export class UserService {
  constructor(
    private cbiUserRepo: CbiUserRepository,
    private cbiUserLevelRepo: CbiUserLevelRepository,
    private cbiLevelGroupAdminService: CbiLevelGroupAdminService,
    private userRepo: UserRepository,
    private cbiRepo: CbiRepository,
    private cbiLevelRepo: CbiLevelRepository,
    private cbiLevelGroupRepo: CbiLevelGroupRepository,
  ) {}

  async submitOneCbiUserLevelAnswer(
    cbiId: any,
    cbiLevelId: any,
    userId: any,
    reqData: SubmitOneCbiUserLevelAnswerDto,
  ) {
    if (!cbiId || !cbiLevelId || !userId) {
      throw new BadRequestExc();
    }
    const [
      cbiLevelGroupsOfCbiLevel,
      userGet,
      cbiUserLevelsSubmittedGet,
      cbiLevelsInCbiGet,
    ] = await Promise.all([
      this.cbiLevelGroupAdminService.getCbiLevelGroupsOfLevel(cbiLevelId),
      this.userRepo.findOne(userId),
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
    if (!cbiLevelGroupsOfCbiLevel || !cbiLevelsInCbiGet.length || !userGet) {
      throw new BadRequestExc();
    }

    return await this._submitOneCbiUserLevelAnswer(
      cbiLevelGroupsOfCbiLevel,
      cbiUserLevelsSubmittedGet,
      cbiLevelsInCbiGet,
      cbiId,
      cbiLevelId,
      userId,
      reqData,
    );
  }

  async submitOneCbiUserLevelAnswerByCbiSlug(
    cbiSlug: string,
    cbiLevelSlug: string,
    userId: any,
    reqData: SubmitOneCbiUserLevelAnswerDto,
  ) {
    if (!cbiSlug || !cbiLevelSlug || !userId) {
      throw new BadRequestExc();
    }
    const [cbiGet, cbiLevelGet] = await Promise.all([
      this.cbiRepo.findOne({
        slug: cbiSlug,
      }),
      this.cbiLevelRepo.findOne({
        slug: cbiLevelSlug,
      }),
    ]);
    if (!cbiGet || !cbiLevelGet) {
      throw new BadRequestExc();
    }
    if (cbiGet.id != cbiLevelGet.cbi_id) {
      throw new BadRequestExc();
    }
    const cbiId = cbiGet.id;
    const cbiLevelId = cbiLevelGet.id;
    const [
      cbiLevelGroupsOfCbiLevel,
      userGet,
      cbiUserLevelsSubmittedGet,
      cbiLevelsInCbiGet,
    ] = await Promise.all([
      this.cbiLevelGroupAdminService.getCbiLevelGroupsOfLevel(cbiLevelId),
      this.userRepo.findOne(userId),
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
    if (!cbiLevelGroupsOfCbiLevel || !cbiLevelsInCbiGet.length || !userGet) {
      throw new BadRequestExc();
    }

    return await this._submitOneCbiUserLevelAnswer(
      cbiLevelGroupsOfCbiLevel,
      cbiUserLevelsSubmittedGet,
      cbiLevelsInCbiGet,
      cbiId,
      cbiLevelId,
      userId,
      reqData,
    );
  }

  async profileGetCbiUserLevelsSubmitted(userId: any, cbiUserId: any) {
    if (!cbiUserId || !userId) {
      throw new BadRequestExc();
    }
    const results = await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoinAndSelect(
        'cbi_user_level.cbi_level',
        'cbi_user_level_cbi_level',
      )
      .innerJoin(
        'cbi_user_level.cbi_user',
        'cbi_user_level_cbi_user',
        'cbi_user_level_cbi_user.id = :cbi_user_id AND cbi_user_level_cbi_user.user_id = :user_id',
        {
          cbi_user_id: cbiUserId,
          user_id: userId,
        },
      )
      .where('cbi_user_level.status_finish = :status_finish', {
        status_finish: BooleanStatusEnum.TRUE,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'cbi_user_level_cbi_level.auto_calculate_score = :auto_calculate_score_true',
            {
              auto_calculate_score_true: BooleanStatusEnum.TRUE,
            },
          ).orWhere(
            'cbi_user_level_cbi_level.auto_calculate_score = :auto_calculate_score_false AND cbi_user_level.status_admin_calculate_score = :status_admin_calculate_score',
            {
              auto_calculate_score_false: BooleanStatusEnum.FALSE,
              status_admin_calculate_score: BooleanStatusEnum.TRUE,
            },
          );
        }),
      )
      .orderBy({
        'cbi_user_level_cbi_level.level': 'ASC',
      })
      .getMany();

    return { results };
  }

  async profileGetCbiUserLevelSubmitted(userId: any, cbiUserLevelId: any) {
    if (!cbiUserLevelId || !userId) {
      throw new BadRequestExc();
    }
    const cbiUserLevelGet = await this.cbiUserLevelRepo
      .createQueryBuilder('cbi_user_level')
      .innerJoin('cbi_user_level.cbi_level', 'cbi_user_level_cbi_level')
      .innerJoinAndSelect(
        'cbi_user_level.cbi_user_question_answers',
        'cbi_user_level_cbi_user_question_answers',
      )
      .innerJoin(
        'cbi_user_level.cbi_user',
        'cbi_user_level_cbi_user',
        'cbi_user_level_cbi_user.user_id = :user_id',
        {
          user_id: userId,
        },
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
            'cbi_user_level_cbi_level.auto_calculate_score = :auto_calculate_score_true',
            {
              auto_calculate_score_true: BooleanStatusEnum.TRUE,
            },
          ).orWhere(
            'cbi_user_level_cbi_level.auto_calculate_score = :auto_calculate_score_false AND cbi_user_level.status_admin_calculate_score = :status_admin_calculate_score',
            {
              auto_calculate_score_false: BooleanStatusEnum.FALSE,
              status_admin_calculate_score: BooleanStatusEnum.TRUE,
            },
          );
        }),
      )
      .getOne();
    if (!cbiUserLevelGet || !cbiUserLevelGet.cbi_user_question_answers.length) {
      throw new BadRequestExc();
    }
    const results = await this.getCbiLevelGroupsFullQuestions(cbiUserLevelGet);

    return { results };
  }

  private async _submitOneCbiUserLevelAnswer(
    cbiLevelGroupsOfCbiLevel: any,
    cbiUserLevelsSubmittedGet: CbiUserLevelEntity[],
    cbiLevelsInCbiGet: CbiLevelEntity[],
    cbiId: any,
    cbiLevelId: any,
    userId: any,
    reqData: SubmitOneCbiUserLevelAnswerDto,
  ) {
    // TODO: check user type is client type
    // Validate can submit
    if (
      false ==
      validateUserCanSubmitOneCbiLevelAnswer(
        cbiLevelsInCbiGet,
        cbiUserLevelsSubmittedGet,
        cbiLevelId,
      )
    ) {
      throw new BadRequestExc();
    }

    // Validate data submit
    if (
      false ==
      validateDataUserSubmitOneCbiLevelAnswer(
        cbiLevelGroupsOfCbiLevel.results,
        reqData.questions,
      )
    ) {
      throw new BadRequestExc();
    }
    const mapCbiLevelsInCbiGetById = generateMapDataWithKeyFieldPair(
      'id',
      '',
      cbiLevelsInCbiGet,
    );
    const cbiLevelSubmit: CbiLevelEntity = mapCbiLevelsInCbiGetById[cbiLevelId];
    const isCbiLevelAutoCalculateScore =
      BooleanStatusEnum.TRUE == cbiLevelSubmit.auto_calculate_score;
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
    // Other cbi levels confirmed all -> check with cbi level submitting
    if (true == isCbiConfirmedAllLevelsScore) {
      // Cbi level submitting is auto calculate score
      if (true == isCbiLevelAutoCalculateScore) {
        // User not finish yet -> cbi not finish yet
        if (BooleanStatusEnum.FALSE == reqData.status_finish) {
          isCbiConfirmedAllLevelsScore = false;
        }
      } else {
        // Cbi level submitting not auto calculate score -> need admin confirm score -> not finish yet
        isCbiConfirmedAllLevelsScore = false;
      }
    }
    const dataSaveCbiUser: any = {};
    let dataSaveCbiUserLevel: any = {};
    const totalScoreCbiUserLevel =
      calculateTotalScoreOfDataUserSubmitOneCbiLevelAnswer(reqData.questions);
    let totalScoreCbiUser = totalScoreCbiUserLevel;
    const dataDeleteOldCbiUserLevel: any = {};
    const dataDeleteOldCbiUserQuestionAnswer: any = {};
    let needDeleteOldBeforeInsert: boolean = false;
    let countCbiUserLevelFinishedSubmit = 0;
    if (cbiUserLevelsSubmittedGet.length) {
      const cbiUserSubmitted: CbiUserEntity =
        cbiUserLevelsSubmittedGet[0].cbi_user;
      dataSaveCbiUser['id'] = cbiUserSubmitted.id;
      for (const cbiUserLevelSubmittedGet of cbiUserLevelsSubmittedGet) {
        if (cbiLevelId != cbiUserLevelSubmittedGet.cbi_level_id) {
          totalScoreCbiUser += Number(cbiUserLevelSubmittedGet.total_scores);
          // Because we validated only allow submit a cbi level when all previous cbi levels finished
          // We don't need check status_finish of other cbi user levels submitted
          countCbiUserLevelFinishedSubmit++;
        }
      }
      // Cbi user level existed -> delete before insert
      if (
        true == mapCbiUserLevelsSubmittedByCbiLevelId.hasOwnProperty(cbiLevelId)
      ) {
        const cbiUserLevelSubmitted: CbiUserLevelEntity =
          mapCbiUserLevelsSubmittedByCbiLevelId[cbiLevelId];
        dataDeleteOldCbiUserLevel['id'] = cbiUserLevelSubmitted.id;
        dataDeleteOldCbiUserQuestionAnswer['cbi_user_level_id'] =
          cbiUserLevelSubmitted.id;
        needDeleteOldBeforeInsert = true;
      }
    } else {
      dataSaveCbiUser['user_id'] = userId;
      dataSaveCbiUser['cbi_id'] = cbiId;
    }
    dataSaveCbiUser['total_scores'] = totalScoreCbiUser;
    dataSaveCbiUserLevel = {
      cbi_level_id: cbiLevelId,
      total_scores: totalScoreCbiUserLevel,
      status_finish: reqData.status_finish,
      cbi_user_question_answers: reqData.questions,
    };
    if (false == isCbiLevelAutoCalculateScore) {
      dataSaveCbiUserLevel['status_admin_calculate_score'] =
        BooleanStatusEnum.FALSE;
    }
    if (BooleanStatusEnum.TRUE == reqData.status_finish) {
      countCbiUserLevelFinishedSubmit++;
    }
    const dataReturn: any = {
      status: BooleanStatusEnum.TRUE,
      result: {},
    };

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
        dataReturn['result']['total_scores'] = totalScoreCbiUser;
        dataReturn['result']['status_pass'] = dataSaveCbiUser['status_pass'];
        dataReturn['result']['title_earned'] = dataSaveCbiUser['title_earned'];
      }
    } else {
      // Only show total score with cbi level auto calculate score when user finished
      if (
        true == isCbiLevelAutoCalculateScore &&
        BooleanStatusEnum.TRUE == reqData.status_finish
      ) {
        dataReturn['result']['total_scores'] = totalScoreCbiUserLevel;
      }
    }
    const result = await this.cbiUserRepo.manager.transaction(
      async (entityManager) => {
        const cbiUserRepo =
          entityManager.getCustomRepository(CbiUserRepository);
        const cbiUserLevelRepo = entityManager.getCustomRepository(
          CbiUserLevelRepository,
        );
        const cbiUserQuestionAnswerRepo = entityManager.getCustomRepository(
          CbiUserQuestionAnswerRepository,
        );

        if (true == needDeleteOldBeforeInsert) {
          await cbiUserQuestionAnswerRepo.delete(
            dataDeleteOldCbiUserQuestionAnswer,
          );
          await cbiUserLevelRepo.delete(dataDeleteOldCbiUserLevel);
        }
        const cbiUserSaved = await cbiUserRepo.save(dataSaveCbiUser, {
          transaction: false,
        });
        dataSaveCbiUserLevel['cbi_user_id'] = cbiUserSaved.id;
        await cbiUserLevelRepo.save(dataSaveCbiUserLevel);

        return true;
      },
    );

    return dataReturn;
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
              results[i].questions[j].options[k]['answer'] =
                cbiUserQuestionOptionAnswerSubmitted;
            }
          }
        }
      }
    }

    return results;
  }
}
