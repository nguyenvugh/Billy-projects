import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CbiRepository } from '../../cbi/repository/cbi.repository';
import { CbiLevelRepository } from '../repository/cbi-level.repository';
import { AdminModule as CbiUserAdminModule } from '../../../cbi-user/cbi-user/admin/admin.module';
import { AdminModule as CbiUserLevelAdminModule } from '../../../cbi-user/cbi-user-level/admin/admin.module';
import { AdminCbiLevelSubscriber } from './subscriber/admin-cbi-level.subscriber';
import { UtilsModule } from '../../../utils-module/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CbiRepository, CbiLevelRepository]),
    CbiUserLevelAdminModule,
    CbiUserAdminModule,
    UtilsModule,
  ],
  //controllers: [AdminController],
  providers: [AdminService, AdminCbiLevelSubscriber],
  exports: [AdminService],
})
export class AdminModule {}
