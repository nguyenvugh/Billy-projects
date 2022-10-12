import { Injectable } from '@nestjs/common';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { CbiQuestionOptionTypeEnum } from '../../cbi-question-option/constant';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import {
  generateMapArrayDataWithKeyPair,
  generateMapDataWithKeyFieldPair,
} from '../../../common/utils';
import { CbiLevelRepository } from '../../cbi-level/repository/cbi-level.repository';
import { CbiLevelGroupRepository } from '../repository/cbi-level-group.repository';
import { CbiLevelGroupEntity } from '../entity/cbi-level-group.entity';
import { CbiUserLevelRepository } from '../../../cbi-user/cbi-user-level/repository/cbi-user-level.repository';
import { CbiUserLevelEntity } from '../../../cbi-user/cbi-user-level/entity/cbi-user-level.entity';
import { CbiUserQuestionAnswerEntity } from '../../../cbi-user/cbi-user-question-answer/entity/cbi-user-question-answer.entity';

@Injectable()
export class UserService {
  constructor(
    private cbiLevelRepo: CbiLevelRepository,
    private cbiLevelGroupRepo: CbiLevelGroupRepository,
    private cbiUserLevelRepo: CbiUserLevelRepository,
  ) {}

  async getCbiLevelGroupsOfLevel(cbiId: any, cbiLevelId: any, userId: any) {
    if (!cbiId || !cbiLevelId || !userId) {
      throw new BadRequestExc();
    }
    const [results, cbiLevelGet, cbiUserLevelSubmittedGet] = await Promise.all([
      this.cbiLevelGroupRepo
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
          cbi_level_id: cbiLevelId,
        })
        .orderBy({
          'cbi_level_group.order_display': 'ASC',
          'cbi_level_group_questions.order_display': 'ASC',
          'cbi_level_group_questions_options.order_display': 'ASC',
          'cbi_level_group_questions_options_values.order_display': 'ASC',
        })
        .getMany(),
      this.cbiLevelRepo.findOne({
        id: cbiLevelId,
        status_publish: BooleanStatusEnum.TRUE,
      }),
      this.cbiUserLevelRepo
        .createQueryBuilder('cbi_user_level')
        .innerJoin(
          'cbi_user_level.cbi_user',
          'cbi_user_level_cbi_user',
          'cbi_user_level_cbi_user.user_id = :user_id AND cbi_user_level_cbi_user.cbi_id = :cbi_id',
          {
            user_id: userId,
            cbi_id: cbiId,
          },
        )
        .innerJoinAndSelect(
          'cbi_user_level.cbi_user_question_answers',
          'cbi_user_level_cbi_user_question_answers',
        )
        .where('cbi_user_level.cbi_level_id = :cbi_level_id', {
          cbi_level_id: cbiLevelId,
        })
        .getOne(),
    ]);
    if (!results.length || !cbiLevelGet) {
      throw new BadRequestExc();
    }
    if (cbiId != cbiLevelGet.cbi_id) {
      throw new BadRequestExc();
    }

    return this.generateResponseGetCbiLevelGroupsOfLevel(
      results,
      cbiUserLevelSubmittedGet,
    );
  }

  async getCbiLevelGroupsOfCbiLevelSlug(
    cbiSlug: string,
    cbiLevelSlug: string,
    userId: any,
  ) {
    if (!cbiSlug || !cbiLevelSlug || !userId) {
      throw new BadRequestExc();
    }
    const [results, cbiLevelGet, cbiUserLevelSubmittedGet] = await Promise.all([
      this.cbiLevelGroupRepo
        .createQueryBuilder('cbi_level_group')
        .innerJoin(
          'cbi_level_group.cbi_level',
          'cbi_level_group_cbi_level',
          'cbi_level_group_cbi_level.slug = :cbi_level_slug',
          {
            cbi_level_slug: cbiLevelSlug,
          },
        )
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
        .orderBy({
          'cbi_level_group.order_display': 'ASC',
          'cbi_level_group_questions.order_display': 'ASC',
          'cbi_level_group_questions_options.order_display': 'ASC',
          'cbi_level_group_questions_options_values.order_display': 'ASC',
        })
        .getMany(),
      this.cbiLevelRepo
        .createQueryBuilder('cbi_level')
        .innerJoinAndSelect('cbi_level.cbi', 'cbi_level_cbi')
        .where({
          slug: cbiLevelSlug,
          status_publish: BooleanStatusEnum.TRUE,
        })
        .getOne(),
      this.cbiUserLevelRepo
        .createQueryBuilder('cbi_user_level')
        .innerJoin(
          'cbi_user_level.cbi_level',
          'cbi_user_level_cbi_level',
          'cbi_user_level_cbi_level.slug = :cbi_level_slug',
          {
            cbi_level_slug: cbiLevelSlug,
          },
        )
        .innerJoin(
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
        .innerJoinAndSelect(
          'cbi_user_level.cbi_user_question_answers',
          'cbi_user_level_cbi_user_question_answers',
        )
        .getOne(),
    ]);
    if (!results.length || !cbiLevelGet) {
      throw new BadRequestExc();
    }
    if (cbiSlug != cbiLevelGet.cbi.slug) {
      throw new BadRequestExc();
    }

    return this.generateResponseGetCbiLevelGroupsOfLevel(
      results,
      cbiUserLevelSubmittedGet,
    );
  }

  private generateResponseGetCbiLevelGroupsOfLevel(
    cbiLevelGroupsOfCbiLevel: CbiLevelGroupEntity[],
    cbiUserLevelSubmittedGet: CbiUserLevelEntity,
  ) {
    let mapCbiUserQuestionAnswersSubmittedByQuestionId: any = {};
    if (cbiUserLevelSubmittedGet) {
      mapCbiUserQuestionAnswersSubmittedByQuestionId =
        generateMapArrayDataWithKeyPair(
          'cbi_question_id',
          cbiUserLevelSubmittedGet.cbi_user_question_answers,
        );
    }
    for (let i = 0; i < cbiLevelGroupsOfCbiLevel.length; i++) {
      const group = cbiLevelGroupsOfCbiLevel[i];
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
              cbiLevelGroupsOfCbiLevel[i].questions[j].options[k]['answer'] =
                cbiUserQuestionOptionAnswerSubmitted;
            }
          }
        }
      }
    }

    return { results: cbiLevelGroupsOfCbiLevel };
  }
}
