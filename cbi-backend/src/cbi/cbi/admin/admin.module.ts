import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CbiRepository } from '../repository/cbi.repository';
import { AdminModule as CbiLevelAdminModule } from '../../cbi-level/admin/admin.module';
import { AdminModule as CbiLevelGroupAdminModule } from '../../cbi-level-group/admin/admin.module';
import { AdminModule as CbiQuestionAdminModule } from '../../cbi-question/admin/admin.module';
import { AdminModule as CbiUserAdminModule } from '../../../cbi-user/cbi-user/admin/admin.module';
import { AdminCbiSubscriber } from './subscriber/admin-cbi.subscriber';
import { UtilsModule } from '../../../utils-module/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CbiRepository]),
    CbiLevelAdminModule,
    CbiLevelGroupAdminModule,
    CbiQuestionAdminModule,
    CbiUserAdminModule,
    UtilsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminCbiSubscriber],
})
export class AdminModule {}
