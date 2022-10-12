import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CbiUserLevelRepository } from '../repository/cbi-user-level.repository';
import { CbiLevelRepository } from '../../../cbi/cbi-level/repository/cbi-level.repository';
import { CbiLevelGroupRepository } from '../../../cbi/cbi-level-group/repository/cbi-level-group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CbiUserLevelRepository,
      CbiLevelRepository,
      CbiLevelGroupRepository,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
