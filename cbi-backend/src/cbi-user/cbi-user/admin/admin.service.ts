import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CbiUserRepository } from '../repository/cbi-user.repository';

@Injectable()
export class AdminService {
  constructor(private cbiUserRepo: CbiUserRepository) {}

  async checkCbiHasUserSubmit(cbiId: any) {
    if (!cbiId) {
      return true;
    }
    const cbiUserSubmittedGet = await this.cbiUserRepo
      .createQueryBuilder('cbi_user')
      .where({
        cbi_id: cbiId,
      })
      .getOne();

    return cbiUserSubmittedGet ? true : false;
  }

  async getListCbisHasUserSubmit(cbiIds: any[]) {
    if (!cbiIds.length) {
      return [];
    }
    return await this.cbiUserRepo
      .createQueryBuilder('cbi_user')
      .where({
        cbi_id: In(cbiIds),
      })
      .getMany();
  }
}
