import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiQuestionEntity } from '../entity/cbi-question.entity';

@EntityRepository(CbiQuestionEntity)
export class CbiQuestionRepository extends Repository<CbiQuestionEntity> {
  async checkTitleExists(
    cbiLevelGroupId: any,
    title: string,
    idExclude: any = null,
  ) {
    if (!cbiLevelGroupId || !title.length) {
      return true;
    }
    const condition: any = {
      title: title,
      cbi_level_group_id: cbiLevelGroupId,
    };
    if (idExclude) {
      condition['id'] = Not(idExclude);
    }
    const result = await this.findOne({
      where: condition,
    });

    return result ? true : false;
  }

  async getMaxCbiQuestionOrderDisplayOfCbiLevelGroup(cbiLevelGroupId: any) {
    let maxCbiQuestionOrderDisplay = 0;
    if (!cbiLevelGroupId) {
      return maxCbiQuestionOrderDisplay;
    }
    const maxCbiLevelGet = await this.findOne({
      where: {
        cbi_level_group_id: cbiLevelGroupId,
      },
      order: {
        order_display: 'DESC',
      },
    });
    if (!maxCbiLevelGet) {
      return maxCbiQuestionOrderDisplay;
    }

    return maxCbiLevelGet.order_display;
  }
}
