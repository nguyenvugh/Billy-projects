import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiEntity } from '../entity/cbi.entity';

@EntityRepository(CbiEntity)
export class CbiRepository extends Repository<CbiEntity> {
  async checkNameExists(name: string, idExclude: any = null) {
    if (!name.length) {
      return true;
    }
    const condition: any = { name };
    if (idExclude) {
      condition['id'] = Not(idExclude);
    }
    const result = await this.findOne({
      where: condition,
    });

    return result ? true : false;
  }

  async getCbiAndCountTotalLevels(cbiId: any) {
    if (!cbiId) {
      return null;
    }
    return await this.createQueryBuilder('cbi')
      .loadRelationCountAndMap('cbi.count_total_levels', 'cbi.levels')
      .where({
        id: cbiId,
      })
      .getOne();
  }
}
