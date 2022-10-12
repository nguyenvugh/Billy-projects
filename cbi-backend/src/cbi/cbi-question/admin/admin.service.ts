import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT } from '../../cbi/constant';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import { CreateOneCbiQuestionDto } from './dto/request/create-one-cbi-question.dto';
import { UpdateOneCbiQuestionDto } from './dto/request/update-one-cbi-question.dto';
import { ReOrderCbiQuestionsDto } from './dto/request/re-order-cbi-questions.dto';
import {
  validateDataAdminCreateCbiQuestion,
  calculateTotalScoreOfQuestion,
  overrideUnEditableDataAdminUpdateCbiQuestion,
  validateDataAdminUpdateCbiQuestion,
  extractCbiQuestionOptionIdsDeleteFromDataAdminUpdateCbiQuestion,
  extractCbiQuestionOptionValueIdsDeleteFromDataAdminUpdateCbiQuestion,
  updateOrderDisplayToItemsInList,
} from '../helper/cbi-question.helper';
import { validateNameChars } from '../../../common/helpers/validate.helper';
import {
  ADD_NEW_CBI_QUESTION_FAIL_BECAUSE_HAS_USER_SUBMIT,
  RE_ORDER_CBI_QUESTION_FAIL_BECAUSE_HAS_USER_SUBMIT,
  UPDATE_CBI_QUESTION_FAIL_BECAUSE_HAS_USER_SUBMIT,
} from '../constant';
import { CbiQuestionRepository } from '../repository/cbi-question.repository';
import { CbiLevelGroupRepository } from '../../cbi-level-group/repository/cbi-level-group.repository';
import { CbiLevelRepository } from '../../cbi-level/repository/cbi-level.repository';
import { CbiQuestionOptionRepository } from '../../cbi-question-option/repository/cbi-question-option.repository';
import { CbiQuestionOptionValueRepository } from '../../cbi-question-option-value/repository/cbi-question-option-value.repository';
import { AdminService as CbiUserLevelAdminService } from '../../../cbi-user/cbi-user-level/admin/admin.service';

@Injectable()
export class AdminService {
  constructor(
    private cbiQuestionRepo: CbiQuestionRepository,
    private cbiLevelGroupRepo: CbiLevelGroupRepository,
    private cbiLevelRepo: CbiLevelRepository,
    private cbiUserLevelAdminService: CbiUserLevelAdminService,
  ) {}

  async createOneCbiQuestion(
    cbiLevelGroupId: any,
    reqData: CreateOneCbiQuestionDto,
  ) {
    if (!cbiLevelGroupId) {
      throw new BadRequestExc();
    }
    const { title } = reqData;
    // if (false == validateNameChars(title)) {
    //   throw new BadRequestExc();
    // }
    const [cbiLevelGroupGet, checkTitleExists, maxCbiQuestionOrderDisplay] =
      await Promise.all([
        this.cbiLevelGroupRepo
          .createQueryBuilder('cbi_level_group')
          .innerJoinAndSelect(
            'cbi_level_group.cbi_level',
            'cbi_level_group_cbi_level',
          )
          .where({
            id: cbiLevelGroupId,
          })
          .getOne(),
        this.cbiQuestionRepo.checkTitleExists(cbiLevelGroupId, title),
        this.cbiQuestionRepo.getMaxCbiQuestionOrderDisplayOfCbiLevelGroup(
          cbiLevelGroupId,
        ),
      ]);
    if (!cbiLevelGroupGet) {
      throw new BadRequestExc();
    }
    if (true == checkTitleExists) {
      throw new ConflictExc('Câu hỏi đã bị trùng lặp');
    }
    // Validate cbi level has user submit
    const checkCbiLevelHasUserSubmit =
      await this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(
        cbiLevelGroupGet.cbi_level_id,
      );
    if (true == checkCbiLevelHasUserSubmit) {
      throw new BadRequestExc(
        ADD_NEW_CBI_QUESTION_FAIL_BECAUSE_HAS_USER_SUBMIT,
      );
    }
    if (
      false ==
      validateDataAdminCreateCbiQuestion(cbiLevelGroupGet.cbi_level, reqData)
    ) {
      throw new BadRequestExc();
    }
    const questionTotalScores = calculateTotalScoreOfQuestion(reqData);
    const levelTotalQuestion = cbiLevelGroupGet.cbi_level.total_questions + 1;
    reqData.options =
      this.updateOrderDisplayForDataUpdateCbiQuestionOptionsAndValues(
        reqData.options,
      );
    const cbiQuestionCreated = await this.cbiQuestionRepo.manager.transaction(
      async (entityManager) => {
        const cbiQuestionRepo = entityManager.getCustomRepository(
          CbiQuestionRepository,
        );
        const cbiLevelRepo =
          entityManager.getCustomRepository(CbiLevelRepository);
        // TODO: add created_by relation data to cbi question create data
        const [cbiQuestionCreated, cbiLevelUpdated] = await Promise.all([
          cbiQuestionRepo.save({
            ...reqData,
            cbi_level_group_id: cbiLevelGroupId,
            total_scores: questionTotalScores,
            order_display: maxCbiQuestionOrderDisplay + 1,
          }),
          cbiLevelRepo.save(
            {
              id: cbiLevelGroupGet.cbi_level_id,
              total_questions: levelTotalQuestion,
            },
            {
              transaction: false,
            },
          ),
        ]);

        return cbiQuestionCreated;
      },
    );

    return cbiQuestionCreated;
  }

  async updateOneCbiQuestion(
    cbiLevelGroupId: any,
    id: any,
    reqData: UpdateOneCbiQuestionDto,
  ) {
    if (!cbiLevelGroupId || !id) {
      throw new BadRequestExc();
    }
    const { title } = reqData;
    // if (false == validateNameChars(title)) {
    //   throw new BadRequestExc();
    // }
    const [cbiLevelGroupGet, cbiQuestionGet] = await Promise.all([
      this.cbiLevelGroupRepo
        .createQueryBuilder('cbi_level_group')
        .innerJoinAndSelect(
          'cbi_level_group.cbi_level',
          'cbi_level_group_cbi_level',
        )
        .where({
          id: cbiLevelGroupId,
        })
        .getOne(),
      this.cbiQuestionRepo
        .createQueryBuilder('cbi_question')
        .leftJoinAndSelect('cbi_question.options', 'cbi_question_options')
        .leftJoinAndSelect(
          'cbi_question_options.values',
          'cbi_question_options_values',
        )
        .where({
          id: id,
        })
        .getOne(),
    ]);
    if (!cbiLevelGroupGet || !cbiQuestionGet) {
      throw new BadRequestExc();
    }
    if (cbiLevelGroupGet.id != cbiQuestionGet.cbi_level_group_id) {
      throw new BadRequestExc();
    }
    const checkTitleExists = await this.cbiQuestionRepo.checkTitleExists(
      cbiLevelGroupId,
      title,
      id,
    );
    if (true == checkTitleExists) {
      throw new ConflictExc('Câu hỏi đã bị trùng lặp');
    }
    const checkCbiLevelHasUserSubmit =
      await this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(
        cbiLevelGroupGet.cbi_level_id,
      );
    const allowUpdateQuestionDetail =
      false == checkCbiLevelHasUserSubmit ? true : false;
    reqData = overrideUnEditableDataAdminUpdateCbiQuestion(
      cbiQuestionGet,
      reqData,
    );
    if (
      false ==
      validateDataAdminUpdateCbiQuestion(
        cbiLevelGroupGet.cbi_level,
        cbiQuestionGet,
        reqData,
        allowUpdateQuestionDetail,
      )
    ) {
      throw new BadRequestExc();
    }
    // TODO: because with old question options not in question options data update, typeorm will set relation column is null
    // TODO: delete old question options before call update
    // TODO: research to find a better way
    const cbiQuestionOptionIdsDelete =
      extractCbiQuestionOptionIdsDeleteFromDataAdminUpdateCbiQuestion(
        cbiQuestionGet,
        reqData,
      );
    const cbiQuestionOptionValueIdsDelete =
      extractCbiQuestionOptionValueIdsDeleteFromDataAdminUpdateCbiQuestion(
        cbiQuestionGet,
        reqData,
      );
    if (
      cbiQuestionOptionIdsDelete.length ||
      cbiQuestionOptionValueIdsDelete.length
    ) {
      // Validate delete cbi question option when has user submit
      if (true == checkCbiLevelHasUserSubmit) {
        throw new BadRequestExc(
          UPDATE_CBI_QUESTION_FAIL_BECAUSE_HAS_USER_SUBMIT,
        );
      }
    }
    const questionTotalScores = calculateTotalScoreOfQuestion(reqData);
    reqData.options =
      this.updateOrderDisplayForDataUpdateCbiQuestionOptionsAndValues(
        reqData.options,
      );
    return await this.cbiQuestionRepo.manager.transaction(
      async (entityManager) => {
        const cbiQuestionRepo = entityManager.getCustomRepository(
          CbiQuestionRepository,
        );
        const cbiQuestionOptionRepo = entityManager.getCustomRepository(
          CbiQuestionOptionRepository,
        );
        const cbiQuestionOptionValueRepo = entityManager.getCustomRepository(
          CbiQuestionOptionValueRepository,
        );

        if (cbiQuestionOptionValueIdsDelete.length) {
          await cbiQuestionOptionValueRepo.delete({
            id: In(cbiQuestionOptionValueIdsDelete),
          });
        }
        if (cbiQuestionOptionIdsDelete.length) {
          await cbiQuestionOptionValueRepo.delete({
            cbi_question_option_id: In(cbiQuestionOptionIdsDelete),
          });
          await cbiQuestionOptionRepo.delete({
            id: In(cbiQuestionOptionIdsDelete),
          });
        }
        const cbiQuestionUpdated = await cbiQuestionRepo.save(
          {
            ...reqData,
            total_scores: questionTotalScores,
          },
          {
            transaction: false,
          },
        );

        return cbiQuestionUpdated;
      },
    );
  }

  async deleteOneCbiQuestion(cbiLevelGroupId: any, id: any) {
    if (!cbiLevelGroupId || !id) {
      throw new BadRequestExc();
    }
    const [cbiLevelGroupGet, cbiQuestionGet] = await Promise.all([
      this.cbiLevelGroupRepo
        .createQueryBuilder('cbi_level_group')
        .innerJoinAndSelect(
          'cbi_level_group.cbi_level',
          'cbi_level_group_cbi_level',
        )
        .where({
          id: cbiLevelGroupId,
        })
        .getOne(),
      this.cbiQuestionRepo
        .createQueryBuilder('cbi_question')
        .leftJoinAndSelect('cbi_question.options', 'cbi_question_options')
        .where({
          id: id,
        })
        .getOne(),
    ]);
    if (!cbiLevelGroupGet || !cbiQuestionGet) {
      throw new BadRequestExc();
    }
    if (cbiLevelGroupGet.id != cbiQuestionGet.cbi_level_group_id) {
      throw new BadRequestExc();
    }
    // Validate cbi level has user submit
    const checkCbiLevelHasUserSubmit =
      await this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(
        cbiLevelGroupGet.cbi_level_id,
      );
    if (true == checkCbiLevelHasUserSubmit) {
      throw new BadRequestExc(DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    let cbiQuestionOptionDeleteIds: any[] = [];
    if (cbiQuestionGet.options.length) {
      cbiQuestionOptionDeleteIds = cbiQuestionGet.options.map((item) => {
        return item.id;
      });
    }
    let levelTotalQuestion = cbiLevelGroupGet.cbi_level.total_questions - 1;
    levelTotalQuestion = levelTotalQuestion ? levelTotalQuestion : 0;
    const deleteCbiQuestionOk = await this.cbiQuestionRepo.manager.transaction(
      async (entityManager) => {
        const cbiLevelRepo =
          entityManager.getCustomRepository(CbiLevelRepository);
        const cbiQuestionRepo = entityManager.getCustomRepository(
          CbiQuestionRepository,
        );
        const cbiQuestionOptionRepo = entityManager.getCustomRepository(
          CbiQuestionOptionRepository,
        );
        const cbiQuestionOptionValueRepo = entityManager.getCustomRepository(
          CbiQuestionOptionValueRepository,
        );
        if (cbiQuestionOptionDeleteIds.length) {
          await cbiQuestionOptionValueRepo.delete({
            cbi_question_option_id: In(cbiQuestionOptionDeleteIds),
          });
          await cbiQuestionOptionRepo.delete({
            id: In(cbiQuestionOptionDeleteIds),
          });
        }
        await Promise.all([
          await cbiQuestionRepo.delete(id),
          cbiLevelRepo.save(
            {
              id: cbiLevelGroupGet.cbi_level_id,
              total_questions: levelTotalQuestion,
            },
            {
              transaction: false,
            },
          ),
        ]);

        return true;
      },
    );

    return;
  }

  async reOrderCbiQuestions(
    cbiLevelGroupId: any,
    reqData: ReOrderCbiQuestionsDto,
  ) {
    if (!cbiLevelGroupId) {
      throw new BadRequestExc();
    }
    const [cbiQuestionsOfCbi, cbiLevelGroupGet] = await Promise.all([
      this.cbiQuestionRepo.find({
        where: {
          cbi_level_group_id: cbiLevelGroupId,
        },
      }),
      this.cbiLevelGroupRepo.findOne(cbiLevelGroupId),
    ]);
    if (
      !cbiLevelGroupGet ||
      cbiQuestionsOfCbi.length != reqData.cbi_question_ids.length
    ) {
      throw new BadRequestExc();
    }
    const cbiQuestionsInCbiButNotInReOrderData = cbiQuestionsOfCbi.filter(
      (cbiQuestion) => {
        return !reqData.cbi_question_ids.includes(cbiQuestion.id);
      },
    );
    if (cbiQuestionsInCbiButNotInReOrderData.length) {
      throw new BadRequestExc();
    }
    // Validate cbi level has user submit
    const checkCbiLevelHasUserSubmit =
      await this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(
        cbiLevelGroupGet.cbi_level_id,
      );
    if (true == checkCbiLevelHasUserSubmit) {
      throw new BadRequestExc(
        RE_ORDER_CBI_QUESTION_FAIL_BECAUSE_HAS_USER_SUBMIT,
      );
    }
    const dataSetCbiQuestionsOrderDisplay: any[] = [];
    for (let index = 0; index < reqData.cbi_question_ids.length; index++) {
      const cbiQuestionId = reqData.cbi_question_ids[index];
      const cbiQuestionOrderDisplay = index + 1;
      dataSetCbiQuestionsOrderDisplay.push({
        id: cbiQuestionId,
        order_display: cbiQuestionOrderDisplay,
      });
    }
    await this.cbiQuestionRepo.save(dataSetCbiQuestionsOrderDisplay);

    return;
  }

  private updateOrderDisplayForDataUpdateCbiQuestionOptionsAndValues(
    reqDataOptions: any[],
  ) {
    for (let index = 0; index < reqDataOptions.length; index++) {
      const option = reqDataOptions[index];
      option.values = updateOrderDisplayToItemsInList(option.values);
      reqDataOptions[index] = option;
    }
    reqDataOptions = updateOrderDisplayToItemsInList(reqDataOptions);

    return reqDataOptions;
  }
}
