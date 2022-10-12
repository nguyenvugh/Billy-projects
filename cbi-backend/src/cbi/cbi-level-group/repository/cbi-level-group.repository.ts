import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiLevelGroupEntity } from '../entity/cbi-level-group.entity';

@EntityRepository(CbiLevelGroupEntity)
export class CbiLevelGroupRepository extends Repository<CbiLevelGroupEntity> {
  async checkNameExists(cbiLevelId: any, name: string, idExclude: any = null) {
    if (!cbiLevelId || !name.length) {
      return true;
    }
    const condition: any = { name: name, cbi_level_id: cbiLevelId };
    if (idExclude) {
      condition['id'] = Not(idExclude);
    }
    const result = await this.findOne({
      where: condition,
    });

    return result ? true : false;
  }

  async getMaxCbiLevelGroupOrderDisplayOfCbiLevel(cbiLevelId: any) {
    let maxCbiLevelGroupOrderDisplay = 0;
    if (!cbiLevelId) {
      return maxCbiLevelGroupOrderDisplay;
    }
    const maxCbiLevelGet = await this.findOne({
      where: {
        cbi_level_id: cbiLevelId,
      },
      order: {
        order_display: 'DESC',
      },
    });
    if (!maxCbiLevelGet) {
      return maxCbiLevelGroupOrderDisplay;
    }

    return maxCbiLevelGet.order_display;
  }
}
