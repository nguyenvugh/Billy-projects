import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiLevelEntity } from '../entity/cbi-level.entity';

@EntityRepository(CbiLevelEntity)
export class CbiLevelRepository extends Repository<CbiLevelEntity> {
  async checkNameExists(cbiId: any, name: string, idExclude: any = null) {
    if (!cbiId || !name.length) {
      return true;
    }
    const condition: any = { name: name, cbi_id: cbiId };
    if (idExclude) {
      condition['id'] = Not(idExclude);
    }
    const result = await this.findOne({
      where: condition,
    });

    return result ? true : false;
  }

  async getMaxCbiLevelOfCbi(cbiId: any) {
    let maxCbiLevel = 0;
    if (!cbiId) {
      return maxCbiLevel;
    }
    const maxCbiLevelGet = await this.findOne({
      where: {
        cbi_id: cbiId,
      },
      order: {
        level: 'DESC',
      },
    });
    if (!maxCbiLevelGet) {
      return maxCbiLevel;
    }

    return maxCbiLevelGet.level;
  }
}
