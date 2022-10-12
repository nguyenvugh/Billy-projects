import { Injectable } from '@nestjs/common';
import { NotFoundExc } from 'src/common/exceptions/custom.exception';
import { toLimitOffset } from 'src/common/utils';
import { ConfigOxfamRepository } from './config-oxfam.repository';
import { UpdateConfigDto } from './dtos/request/update-config.dto';
import { PaginateDto } from 'src/common/dto/request/paginate.dto';
import { ConfigCebiKey } from 'src/config-cebi/enums/configCebi.enum';
import { ConfigOxfam } from './entities/config-oxfam.entity';

@Injectable()
export class ConfigCebiService {
  constructor(private configOxfamRepo: ConfigOxfamRepository) {}

  async getAllConfig(query: PaginateDto) {
    const {} = await this.configOxfamRepo.findOne();
    const { limit, offset } = toLimitOffset(query.page, query.limit);
    return this.configOxfamRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async getConfigByKey(key: ConfigCebiKey) {
    const config = await this.configOxfamRepo.findOne(key);
    if (!config) {
      throw new NotFoundExc('Config not found');
    }
    return config.value;
  }

  async updateConfig(reqData: UpdateConfigDto) {
    const { key, value } = reqData;
    const configCebi = await this.configOxfamRepo.findOne(key);
    if (!configCebi) throw new NotFoundExc('Config not found');

    const stringifiedValue = JSON.stringify(value);

    const { affected } = await this.configOxfamRepo
      .createQueryBuilder()
      .update(ConfigOxfam)
      .where('key = :key', { key })
      .set({
        value: () => `value || '${stringifiedValue}' `,
      })
      .execute();
    return reqData;
  }
}
