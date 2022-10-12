import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT } from '../../cbi/constant';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import {
  RE_ORDER_CBI_LEVEL_GROUP_FAIL_BECAUSE_HAS_USER_SUBMIT,
  ADD_NEW_CBI_LEVEL_GROUP_FAIL_BECAUSE_HAS_USER_SUBMIT,
} from '../constant';
import { validateNameChars } from '../../../common/helpers/validate.helper';
import { CreateOneCbiLevelGroupDto } from '../../cbi-level-group/admin/dto/request/create-one-cbi-level-group.dto';
import { UpdateOneCbiLevelGroupDto } from '../../cbi-level-group/admin/dto/request/update-one-cbi-level-group.dto';
import { ReOrderCbiLevelGroupsDto } from './dto/request/re-order-cbi-level-groups.dto';
import { CbiLevelGroupRepository } from '../repository/cbi-level-group.repository';
import { CbiLevelRepository } from '../../cbi-level/repository/cbi-level.repository';
import { CbiQuestionRepository } from '../../cbi-question/repository/cbi-question.repository';
import { CbiQuestionOptionRepository } from '../../cbi-question-option/repository/cbi-question-option.repository';
import { CbiQuestionOptionValueRepository } from '../../cbi-question-option-value/repository/cbi-question-option-value.repository';
import { AdminService as CbiUserLevelAdminService } from '../../../cbi-user/cbi-user-level/admin/admin.service';

@Injectable()
export class AdminService {
  constructor(
    private cbiLevelGroupRepo: CbiLevelGroupRepository,
    private cbiLevelRepo: CbiLevelRepository,
    private cbiUserLevelAdminService: CbiUserLevelAdminService,
  ) {}

  async getCbiLevelGroupsOfLevel(cbiLevelId: any) {
    if (!cbiLevelId) {
      throw new BadRequestExc();
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
        cbi_level_id: cbiLevelId,
      })
      .orderBy({
        'cbi_level_group.order_display': 'ASC',
        'cbi_level_group_questions.order_display': 'ASC',
        'cbi_level_group_questions_options.order_display': 'ASC',
        'cbi_level_group_questions_options_values.order_display': 'ASC',
      })
      .getMany();

    return { results };
  }

  async createOneCbiLevelGroup(
    cbiLevelId: any,
    reqData: CreateOneCbiLevelGroupDto,
  ) {
    if (!cbiLevelId) {
      throw new BadRequestExc();
    }
    const { name } = reqData;
    // if (false == validateNameChars(name)) {
    //   throw new BadRequestExc();
    // }
    const [
      cbiLevelGet,
      checkNameExists,
      maxCbiLevelGroupOrderDisplay,
      checkCbiLevelHasUserSubmit,
    ] = await Promise.all([
      this.cbiLevelRepo.findOne(cbiLevelId),
      this.cbiLevelGroupRepo.checkNameExists(cbiLevelId, name),
      this.cbiLevelGroupRepo.getMaxCbiLevelGroupOrderDisplayOfCbiLevel(
        cbiLevelId,
      ),
      this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(cbiLevelId),
    ]);
    if (!cbiLevelGet) {
      throw new BadRequestExc();
    }
    if (true == checkNameExists) {
      throw new ConflictExc('Danh mục đã bị trùng lặp');
    }
    // Validate cbi level has user submit
    if (true == checkCbiLevelHasUserSubmit) {
      throw new BadRequestExc(
        ADD_NEW_CBI_LEVEL_GROUP_FAIL_BECAUSE_HAS_USER_SUBMIT,
      );
    }
    return await this.cbiLevelGroupRepo.save({
      ...reqData,
      cbi_level_id: cbiLevelId,
      order_display: maxCbiLevelGroupOrderDisplay + 1,
    });
  }

  async updateOneCbiLevelGroup(
    cbiLevelId: any,
    id: any,
    reqData: UpdateOneCbiLevelGroupDto,
  ) {
    if (!cbiLevelId || !id) {
      throw new BadRequestExc();
    }
    const { name } = reqData;
    // if (false == validateNameChars(name)) {
    //   throw new BadRequestExc();
    // }
    const [cbiLevelGet, cbiLevelGroupGet] = await Promise.all([
      this.cbiLevelRepo.findOne(cbiLevelId),
      this.cbiLevelGroupRepo.findOne(id),
    ]);
    if (!cbiLevelGet || !cbiLevelGroupGet) {
      throw new BadRequestExc();
    }
    if (cbiLevelGet.id != cbiLevelGroupGet.cbi_level_id) {
      throw new BadRequestExc();
    }
    const checkNameExists = await this.cbiLevelRepo.checkNameExists(
      cbiLevelId,
      name,
      id,
    );
    if (true == checkNameExists) {
      throw new ConflictExc('Danh mục đã bị trùng lặp');
    }
    return await this.cbiLevelGroupRepo.save({
      ...reqData,
      id: id,
    });
  }

  async deleteOneCbiLevelGroup(cbiLevelId: any, id: any) {
    if (!cbiLevelId || !id) {
      throw new BadRequestExc();
    }
    const [cbiLevelGet, cbiLevelGroupGet, checkCbiLevelHasUserSubmit] =
      await Promise.all([
        this.cbiLevelRepo.findOne(cbiLevelId),
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
          .where({
            id: id,
          })
          .getOne(),
        this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(cbiLevelId),
      ]);
    if (!cbiLevelGet || !cbiLevelGroupGet) {
      throw new BadRequestExc();
    }
    if (cbiLevelGet.id != cbiLevelGroupGet.cbi_level_id) {
      throw new BadRequestExc();
    }
    // Validate cbi level has user submit
    if (true == checkCbiLevelHasUserSubmit) {
      throw new BadRequestExc(DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    let cbiQuestionDeleteIds: any[] = [];
    let cbiQuestionOptionDeleteIds: any[] = [];
    if (cbiLevelGroupGet.questions.length) {
      for (const question of cbiLevelGroupGet.questions) {
        cbiQuestionDeleteIds.push(question.id);
        if (question.options.length) {
          for (const option of question.options) {
            cbiQuestionOptionDeleteIds.push(option.id);
          }
        }
      }
    }
    let levelTotalQuestion =
      cbiLevelGet.total_questions - cbiLevelGroupGet.questions.length;
    levelTotalQuestion = levelTotalQuestion ? levelTotalQuestion : 0;
    const deleteCbiLevelGroupOk =
      await this.cbiLevelGroupRepo.manager.transaction(
        async (entityManager) => {
          const cbiLevelRepo =
            entityManager.getCustomRepository(CbiLevelRepository);
          const cbiLevelGroupRepo = entityManager.getCustomRepository(
            CbiLevelGroupRepository,
          );
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
          if (cbiQuestionDeleteIds.length) {
            await cbiQuestionRepo.delete({
              id: In(cbiQuestionDeleteIds),
            });
          }
          await Promise.all([
            await cbiLevelGroupRepo.delete(id),
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

  async reOrderCbiLevelGroups(
    cbiLevelId: any,
    reqData: ReOrderCbiLevelGroupsDto,
  ) {
    if (!cbiLevelId) {
      throw new BadRequestExc();
    }
    const [cbiLevelGroupsOfCbiLevel, checkCbiLevelHasUserSubmit] =
      await Promise.all([
        this.cbiLevelGroupRepo.find({
          where: {
            cbi_level_id: cbiLevelId,
          },
        }),
        this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(cbiLevelId),
      ]);
    if (cbiLevelGroupsOfCbiLevel.length != reqData.cbi_level_group_ids.length) {
      throw new BadRequestExc();
    }
    const cbiLevelGroupsInCbiLevelButNotInReOrderData =
      cbiLevelGroupsOfCbiLevel.filter((cbiLevelGroup) => {
        return !reqData.cbi_level_group_ids.includes(cbiLevelGroup.id);
      });
    if (cbiLevelGroupsInCbiLevelButNotInReOrderData.length) {
      throw new BadRequestExc();
    }
    // Validate cbi level has user submit
    if (true == checkCbiLevelHasUserSubmit) {
      throw new BadRequestExc(
        RE_ORDER_CBI_LEVEL_GROUP_FAIL_BECAUSE_HAS_USER_SUBMIT,
      );
    }
    const dataSetCbiLevelGroupsOrderDisplay: any[] = [];
    for (let index = 0; index < reqData.cbi_level_group_ids.length; index++) {
      const cbiLevelGroupId = reqData.cbi_level_group_ids[index];
      const cbiLevelGroupOrderDisplay = index + 1;
      dataSetCbiLevelGroupsOrderDisplay.push({
        id: cbiLevelGroupId,
        order_display: cbiLevelGroupOrderDisplay,
      });
    }
    await this.cbiLevelGroupRepo.save(dataSetCbiLevelGroupsOrderDisplay);

    return;
  }
}
