import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvDictRepository } from './repository/ev_dict.repository';
import { DictAdminService } from './services/admin/dict-admin.service';
import { DictAdminController } from './controllers/admin/dict-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EvDictRepository])],
  controllers: [DictAdminController],
  providers: [DictAdminService],
})
export class DictionaryModule {}
