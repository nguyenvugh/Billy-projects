import { Injectable } from '@nestjs/common';
import { EvDictRepository } from './repository/ev_dict.repository';

@Injectable()
export class DictionaryService {
  // constructor(private evDictRepo: EvDictRepository) {}

  // async getDictForDev() {
  //   return this.evDictRepo.find();
  // }
}
