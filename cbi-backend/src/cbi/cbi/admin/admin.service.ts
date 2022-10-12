import { Injectable } from '@nestjs/common';
import { In, IsNull, Like } from 'typeorm';
import {
  ConflictExc,
  BadRequestExc,
} from '../../../common/exceptions/custom.exception';
import { generateMapDataWithKeyFieldPair } from '../../../common/utils';
import { parseOffsetAndLimit } from '../../../common/helpers/paginate.helper';
import {
  embedCreatedByToList,
  embedCreatedByToItem,
} from '../../../common/utils';
import { validateNameChars } from '../../../common/helpers/validate.helper';
import { DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT } from '../constant';
import { GetCbisDto as AdminGetCbisDto } from './dto/request/get-cbis.dto';
import { CreateOneCbiDto } from './dto/request/create-one-cbi.dto';
import { UpdateOneCbiDto } from './dto/request/update-one-cbi.dto';
import { DeleteMultiCbisDto } from './dto/request/delete-multi-cbis.dto';
import { CbiRepository } from '../repository/cbi.repository';
import { CbiEntity } from '../entity/cbi.entity';
import { CbiLevelRepository } from '../../cbi-level/repository/cbi-level.repository';
import { CbiLevelGroupRepository } from '../../cbi-level-group/repository/cbi-level-group.repository';
import { CbiQuestionRepository } from '../../cbi-question/repository/cbi-question.repository';
import { CbiQuestionOptionRepository } from '../../cbi-question-option/repository/cbi-question-option.repository';
import { CbiQuestionOptionValueRepository } from '../../cbi-question-option-value/repository/cbi-question-option-value.repository';
import { AdminService as CbiUserAdminService } from '../../../cbi-user/cbi-user/admin/admin.service';
import { SlugService } from '../../../utils-module/service/slug.service';

@Injectable()
export class AdminService {
  constructor(
    private cbiRepo: CbiRepository,
    private cbiUserAdminService: CbiUserAdminService,
    private slugService: SlugService,
  ) {}

  async getCbis(reqData: AdminGetCbisDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [data, total] = await this.cbiRepo
      .createQueryBuilder('cbi')
      .innerJoinAndSelect('cbi.thumbnail', 'cbi_thumbnail')
      // TODO: using created_by relationship
      .orderBy({
        'cbi.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    // TODO: temporary solution, will be deleted right after we has created_by relationship
    const results = embedCreatedByToList(data);
    return { results, total };
  }

  async createOneCbi(reqData: CreateOneCbiDto) {
    const { name } = reqData;
    // if (false == validateNameChars(name)) {
    //   throw new BadRequestExc();
    // }
    const checkNameExists = await this.cbiRepo.checkNameExists(name);
    if (true == checkNameExists) {
      throw new ConflictExc('Tên Bảng câu hỏi đã bị trùng lặp');
    }
    // TODO: add created_by relation data
    const cbiCreated = await this.cbiRepo.save(reqData);
    // TODO: temporary solution, will be deleted right after we has created_by relationship
    return embedCreatedByToItem(cbiCreated);
  }

  async updateOneCbi(id: any, reqData: UpdateOneCbiDto) {
    if (!id) {
      throw new BadRequestExc();
    }
    const { name } = reqData;
    const cbiGet = await this.cbiRepo.findOne(id);
    if (!cbiGet) {
      throw new BadRequestExc();
    }
    // if (false == validateNameChars(name)) {
    //   throw new BadRequestExc();
    // }
    const checkNameExists = await this.cbiRepo.checkNameExists(name, id);
    if (true == checkNameExists) {
      throw new ConflictExc('Tên Bảng câu hỏi đã bị trùng lặp');
    }
    // TODO: set updated_by relationship
    const cbiUpdated = await this.cbiRepo.save({
      ...reqData,
      id: id,
    });
    // TODO: temporary solution, will be deleted right after we has created_by relationship
    return embedCreatedByToItem(cbiUpdated);
  }

  async deleteOneCbi(id: any) {
    if (!id) {
      throw new BadRequestExc();
    }
    const [cbiGet, checkCbiHasUserSubmit] = await Promise.all([
      this.cbiRepo
        .createQueryBuilder('cbi')
        .leftJoinAndSelect('cbi.levels', 'cbi_levels')
        .leftJoinAndSelect('cbi_levels.groups', 'cbi_levels_groups')
        .leftJoinAndSelect(
          'cbi_levels_groups.questions',
          'cbi_levels_groups_questions',
        )
        .leftJoinAndSelect(
          'cbi_levels_groups_questions.options',
          'cbi_levels_groups_questions_options',
        )
        .where({
          id: id,
        })
        .getOne(),
      this.cbiUserAdminService.checkCbiHasUserSubmit(id),
    ]);
    if (!cbiGet) {
      throw new BadRequestExc();
    }
    // Validate cbi has user submit
    if (true == checkCbiHasUserSubmit) {
      throw new BadRequestExc(DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    return await this.deleteOneCbiWithoutValidate(cbiGet);
  }

  async deleteMultiCbi(reqData: DeleteMultiCbisDto) {
    const [cbisGet, cbisHaveUserSubmitGet] = await Promise.all([
      this.cbiRepo
        .createQueryBuilder('cbi')
        .leftJoinAndSelect('cbi.levels', 'cbi_levels')
        .leftJoinAndSelect('cbi_levels.groups', 'cbi_levels_groups')
        .leftJoinAndSelect(
          'cbi_levels_groups.questions',
          'cbi_levels_groups_questions',
        )
        .leftJoinAndSelect(
          'cbi_levels_groups_questions.options',
          'cbi_levels_groups_questions_options',
        )
        .where({
          id: In(reqData.ids),
        })
        .getMany(),
      this.cbiUserAdminService.getListCbisHasUserSubmit(reqData.ids),
    ]);
    // Validate list cbi ids not valid
    if (cbisGet.length != reqData.ids.length) {
      throw new BadRequestExc();
    }
    // Validate has any cbi that has user submit
    if (0 != cbisHaveUserSubmitGet.length) {
      throw new BadRequestExc(DELETE_CBI_FAIL_BECAUSE_HAS_USER_SUBMIT);
    }
    const promisesDeleteCbi: any[] = [];
    for (const cbiGet of cbisGet) {
      promisesDeleteCbi.push(this.deleteOneCbiWithoutValidate(cbiGet));
    }
    await Promise.all(promisesDeleteCbi);

    return;
  }

  async addSlugToMissingData() {
    const missingData = await this.cbiRepo.find({
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
      let numSlugs = await this.cbiRepo.count({
        where: {
          slug: Like(slugNeedCheck + '%'),
        },
      });
      const cbiIds: any[] = mapMissingDataBySlug[slugNeedCheck];
      for (const cbiId of cbiIds) {
        let slugUpdate = slugNeedCheck;
        if (0 < numSlugs) {
          slugUpdate = slugUpdate + `-${numSlugs + 1}`;
        }

        updateData.push({
          id: cbiId,
          slug: slugUpdate,
        });
        numSlugs++;
      }
    }

    await this.cbiRepo.save(updateData);
    return 'ok';
  }

  private async deleteOneCbiWithoutValidate(cbi: CbiEntity) {
    let cbiLevelDeleteIds: any[] = [];
    let cbiLevelGroupDeleteIds: any[] = [];
    let cbiQuestionDeleteIds: any[] = [];
    let cbiQuestionOptionDeleteIds: any[] = [];
    if (cbi.levels.length) {
      for (const level of cbi.levels) {
        cbiLevelDeleteIds.push(level.id);
        if (level.groups.length) {
          for (const group of level.groups) {
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
      }
    }
    const deleteCbiOk = await this.cbiRepo.manager.transaction(
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
        if (cbiLevelDeleteIds.length) {
          await cbiLevelRepo.delete({
            id: In(cbiLevelDeleteIds),
          });
        }
        await cbiRepo.delete(cbi.id);

        return true;
      },
    );

    return;
  }
}
