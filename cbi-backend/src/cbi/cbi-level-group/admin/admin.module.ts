import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CbiLevelGroupRepository } from '../repository/cbi-level-group.repository';
import { CbiLevelRepository } from '../../cbi-level/repository/cbi-level.repository';
import { AdminModule as CbiUserLevelAdminModule } from '../../../cbi-user/cbi-user-level/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CbiLevelGroupRepository, CbiLevelRepository]),
    CbiUserLevelAdminModule,
  ],
  //controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
