import { Injectable } from '@nestjs/common';
import { In, IsNull, Like } from 'typeorm';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import {
  MAX_CBI_LEVELS_IN_CBI,
  RE_ORDER_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT,
  ADD_NEW_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT,
  UPDATE_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT,
  PUBLISH_CBI_LEVEL_FAIL_BECAUSE_HAS_NOT_QUESTION_REQUIRED,
} from '../constant';
import { generateMapDataWithKeyFieldPair } from '../../../common/utils';
import { validateNameChars } from '../../../common/helpers/validate.helper';
import { GetCbiLevelsDto as AdminGetCbiLevelsDto } from './dto/request/get-cbi-levels.dto';
import { CreateOneCbiLevelDto } from './dto/request/create-one-cbi-level.dto';
import { UpdateOneCbiLevelDto } from './dto/request/update-one-cbi-level.dto';
import { ReOrderCbiLevelsDto } from './dto/request/re-order-cbi-levels.dto';
import { DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT } from '../../cbi/constant';
import { CbiRepository } from '../../cbi/repository/cbi.repository';
import { CbiEntity } from '../../cbi/entity/cbi.entity';
import { CbiLevelRepository } from '../repository/cbi-level.repository';
import { CbiLevelEntity } from '../entity/cbi-level.entity';
import { CbiLevelGroupRepository } from '../../cbi-level-group/repository/cbi-level-group.repository';
import { CbiQuestionRepository } from '../../cbi-question/repository/cbi-question.repository';
import { CbiQuestionOptionRepository } from '../../cbi-question-option/repository/cbi-question-option.repository';
import { CbiQuestionOptionValueRepository } from '../../cbi-question-option-value/repository/cbi-question-option-value.repository';
import { AdminService as CbiUserAdminService } from '../../../cbi-user/cbi-user/admin/admin.service';
import { AdminService as CbiUserLevelAdminService } from '../../../cbi-user/cbi-user-level/admin/admin.service';
import { SlugService } from '../../../utils-module/service/slug.service';

@Injectable()
export class AdminService {
  constructor(
    private cbiRepo: CbiRepository,
    private cbiLevelRepo: CbiLevelRepository,
    private cbiUserAdminService: CbiUserAdminService,
    private cbiUserLevelAdminService: CbiUserLevelAdminService,
    private slugService: SlugService,
  ) {}

  async getCbiLevelsOfCbi(cbiId: any, reqData: AdminGetCbiLevelsDto) {
    if (!cbiId) {
      throw new BadRequestExc();
    }
    const results = await this.cbiLevelRepo
      .createQueryBuilder('cbi_level')
      .where({
        cbi_id: cbiId,
      })
      .orderBy({
        'cbi_level.level': 'ASC',
      })
      .getMany();
    return { results };
  }

  async createOneCbiLevel(cbiId: any, reqData: CreateOneCbiLevelDto) {
    if (!cbiId) {
      throw new BadRequestExc();
    }
    const { name } = reqData;
    // if (false == validateNameChars(name)) {
    //   throw new BadRequestExc();
    // }
    // Because in cbi level must has at least one question required
    // Validate publish cbi level when create -> cbi level has not any questions
    if (BooleanStatusEnum.TRUE == reqData.status_publish) {
      throw new BadRequestExc();
    }
    const [cbiGet, checkNameExists, cbiLevelsOfCbi, checkCbiHasUserSubmit] =
      await Promise.all([
        this.cbiRepo.getCbiAndCountTotalLevels(cbiId),
        this.cbiLevelRepo.checkNameExists(cbiId, name),
        this.cbiLevelRepo.find({
          where: {
            cbi_id: cbiId,
          },
          order: {
            level: 'DESC',
          },
        }),
        this.cbiUserAdminService.checkCbiHasUserSubmit(cbiId),
      ]);
    if (!cbiGet) {
      throw new BadRequestExc();
    }
    if (cbiLevelsOfCbi.length >= MAX_CBI_LEVELS_IN_CBI) {
      throw new BadRequestExc();
    }
    if (true == checkNameExists) {
      throw new ConflictExc('Tên giai đoạn đã bị trùng lặp');
    }
    // Validate cbi has user submit
    if (true == checkCbiHasUserSubmit) {
      throw new BadRequestExc(ADD_NEW_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    const maxCbiLevel = cbiLevelsOfCbi.length ? cbiLevelsOfCbi[0].level : 0;
    const cbiLevelCreated = await this.cbiLevelRepo.manager.transaction(
      async (entityManager) => {
        const cbiRepo = entityManager.getCustomRepository(CbiRepository);
        const cbiLevelRepo =
          entityManager.getCustomRepository(CbiLevelRepository);
        const cbiNewTotalLevels = cbiGet['count_total_levels'] + 1;
        const [cbiLevelCreated, cbiUpdated] = await Promise.all([
          cbiLevelRepo.save(
            {
              ...reqData,
              cbi_id: cbiId,
              level: maxCbiLevel + 1,
            },
            {
              transaction: false,
            },
          ),
          cbiRepo.save(
            {
              id: cbiId,
              total_levels: cbiNewTotalLevels,
            },
            {
              transaction: false,
            },
          ),
        ]);

        return cbiLevelCreated;
      },
    );
    return cbiLevelCreated;
  }

  async updateOneCbiLevel(cbiId: any, id: any, reqData: UpdateOneCbiLevelDto) {
    if (!cbiId || !id) {
      throw new BadRequestExc();
    }
    const { name, status_publish, auto_calculate_score } = reqData;
    // if (false == validateNameChars(name)) {
    //   throw new BadRequestExc();
    // }
    const [
      cbiGet,
      cbiLevelGet,
      checkCbiHasUserSubmit,
      checkCbiLevelHasUserSubmit,
    ] = await Promise.all([
      this.cbiRepo.findOne(cbiId),
      this.cbiLevelRepo
        .createQueryBuilder('cbi_level')
        .leftJoinAndSelect('cbi_level.groups', 'cbi_level_groups')
        .leftJoinAndSelect(
          'cbi_level_groups.questions',
          'cbi_level_groups_questions',
          'status_answer_mandatory = :status_answer_mandatory',
          {
            status_answer_mandatory: BooleanStatusEnum.TRUE,
          },
        )
        .where({
          id: id,
        })
        .getOne(),
      this.cbiUserAdminService.checkCbiHasUserSubmit(cbiId),
      this.cbiUserLevelAdminService.checkCbiLevelHasUserSubmit(id),
    ]);
    if (!cbiGet || !cbiLevelGet) {
      throw new BadRequestExc();
    }
    if (cbiGet.id != cbiLevelGet.cbi_id) {
      throw new BadRequestExc();
    }
    const checkNameExists = await this.cbiLevelRepo.checkNameExists(
      cbiId,
      name,
      id,
    );
    if (true == checkNameExists) {
      throw new ConflictExc('Tên giai đoạn đã bị trùng lặp');
    }
    // Validate change status publish of cbi level when cbi has user submit
    if (
      true == checkCbiHasUserSubmit &&
      cbiLevelGet.status_publish != status_publish
    ) {
      throw new BadRequestExc(UPDATE_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    // Validate change auto calculate score of cbi level when cbi level has user submit
    if (
      true == checkCbiLevelHasUserSubmit &&
      cbiLevelGet.auto_calculate_score != auto_calculate_score
    ) {
      throw new BadRequestExc(UPDATE_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    // Validate publish cbi level and has not any questions required
    if (BooleanStatusEnum.TRUE == status_publish) {
      if (!cbiLevelGet.groups.length) {
        throw new BadRequestExc(
          PUBLISH_CBI_LEVEL_FAIL_BECAUSE_HAS_NOT_QUESTION_REQUIRED,
        );
      }
      const cbiLevelGroupsHasQuestionRequired = cbiLevelGet.groups.filter(
        (item) => {
          return item.questions.length;
        },
      );
      if (!cbiLevelGroupsHasQuestionRequired.length) {
        throw new BadRequestExc(
          PUBLISH_CBI_LEVEL_FAIL_BECAUSE_HAS_NOT_QUESTION_REQUIRED,
        );
      }
    }
    return await this.cbiLevelRepo.save({
      ...reqData,
      id: id,
    });
  }

  async deleteOneCbiLevel(cbiId: any, id: any) {
    if (!cbiId || !id) {
      throw new BadRequestExc();
    }
    const [cbiGet, cbiLevelGet, checkCbiHasUserSubmit] = await Promise.all([
      this.cbiRepo.findOne(cbiId),
      this.cbiLevelRepo
        .createQueryBuilder('cbi_level')
        .leftJoinAndSelect('cbi_level.groups', 'cbi_level_groups')
        .leftJoinAndSelect(
          'cbi_level_groups.questions',
          'cbi_level_groups_questions',
        )
        .leftJoinAndSelect(
          'cbi_level_groups_questions.options',
          'cbi_level_groups_questions_options',
        )
        .where({
          id: id,
        })
        .getOne(),
      this.cbiUserAdminService.checkCbiHasUserSubmit(cbiId),
    ]);
    if (!cbiGet || !cbiLevelGet) {
      throw new BadRequestExc();
    }
    if (cbiGet.id != cbiLevelGet.cbi_id) {
      throw new BadRequestExc();
    }
    // Validate cbi level has user submit
    if (true == checkCbiHasUserSubmit) {
      throw new BadRequestExc(DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    return await this.deleteOneCbiLevelWithoutValidate(cbiGet, cbiLevelGet);
  }

  async reOrderCbiLevels(cbiId: any, reqData: ReOrderCbiLevelsDto) {
    if (!cbiId) {
      throw new BadRequestExc();
    }
    const [cbiLevelsOfCbi, checkCbiHasUserSubmit] = await Promise.all([
      this.cbiLevelRepo.find({
        where: {
          cbi_id: cbiId,
        },
      }),
      this.cbiUserAdminService.checkCbiHasUserSubmit(cbiId),
    ]);
    if (cbiLevelsOfCbi.length != reqData.cbi_level_ids.length) {
      throw new BadRequestExc();
    }
    const cbiLevelsInCbiButNotInReOrderData = cbiLevelsOfCbi.filter(
      (cbiLevel) => {
        return !reqData.cbi_level_ids.includes(cbiLevel.id);
      },
    );
    if (cbiLevelsInCbiButNotInReOrderData.length) {
      throw new BadRequestExc();
    }
    // Validate cbi level has user submit
    if (true == checkCbiHasUserSubmit) {
      throw new BadRequestExc(RE_ORDER_CBI_LEVEL_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    const dataSetCbiLevelsLv: any[] = [];
    for (let index = 0; index < reqData.cbi_level_ids.length; index++) {
      const cbiLevelId = reqData.cbi_level_ids[index];
      const cbiLevelLv = index + 1;
      dataSetCbiLevelsLv.push({
        id: cbiLevelId,
        level: cbiLevelLv,
      });
    }
    await this.cbiLevelRepo.save(dataSetCbiLevelsLv);

    return;
  }

  async addSlugToMissingData() {
    const missingData = await this.cbiLevelRepo.find({
      slug: IsNull(),
    });
    if (!missingData.length) {
      return 'nothing';
    }
    const mapMissingDataBySlug: any = {};
    const updateData: any[] = [];
    for (const item of missingData) {
      let slug = this.slugService.slug(item.name);
      if (false == mapMissingDataBySlug.hasOwnProperty(slug)) {
        mapMissingDataBySlug[slug] = [];
      }
      mapMissingDataBySlug[slug].push(item.id);
    }
    const slugsNeedCheck = Object.keys(mapMissingDataBySlug);
    for (const slugNeedCheck of slugsNeedCheck) {
      let numSlugs = await this.cbiLevelRepo.count({
        where: {
          slug: Like(slugNeedCheck + '%'),
        },
      });
      const cbiLevelIds: any[] = mapMissingDataBySlug[slugNeedCheck];
      for (const cbiLevelId of cbiLevelIds) {
        let slugUpdate = slugNeedCheck;
        if (0 < numSlugs) {
          slugUpdate = slugUpdate + `-${numSlugs + 1}`;
        }

        updateData.push({
          id: cbiLevelId,
          slug: slugUpdate,
        });
        numSlugs++;
      }
    }

    await this.cbiLevelRepo.save(updateData);
    return 'ok';
  }

  private async deleteOneCbiLevelWithoutValidate(
    cbi: CbiEntity,
    cbiLevel: CbiLevelEntity,
  ) {
    let cbiLevelGroupDeleteIds: any[] = [];
    let cbiQuestionDeleteIds: any[] = [];
    let cbiQuestionOptionDeleteIds: any[] = [];
    if (cbiLevel.groups.length) {
      for (const group of cbiLevel.groups) {
        cbiLevelGroupDeleteIds.push(group.id);
        if (group.questions.length) {
          for (const question of group.questions) {
            cbiQuestionDeleteIds.push(question.id);
            if (question.options.length) {
              for (const option of question.options) {
                cbiQuestionOptionDeleteIds.push(option.id);
              }
            }
          }
        }
      }
    }
    let cbiTotalLevels = cbi.total_levels - 1;
    cbiTotalLevels = cbiTotalLevels ? cbiTotalLevels : 0;
    const deleteCbiLevelOk = await this.cbiLevelRepo.manager.transaction(
      async (entityManager) => {
        const cbiRepo = entityManager.getCustomRepository(CbiRepository);
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
        if (cbiLevelGroupDeleteIds.length) {
          await cbiLevelGroupRepo.delete({
            id: In(cbiLevelGroupDeleteIds),
          });
        }
        await Promise.all([
          await cbiLevelRepo.delete(cbiLevel.id),
          cbiRepo.save(
            {
              id: cbiLevel.cbi_id,
              total_levels: cbiTotalLevels,
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
}
