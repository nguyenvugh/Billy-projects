import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CbiUserLevelRepository } from '../repository/cbi-user-level.repository';
import { CbiUserRepository } from '../../cbi-user/repository/cbi-user.repository';
import { UserRepository } from '../../../auth/repository/user.repository';
import { CbiLevelRepository } from '../../../cbi/cbi-level/repository/cbi-level.repository';
import { AdminModule as CbiLevelGroupAdminModule } from '../../../cbi/cbi-level-group/admin/admin.module';
import { CbiLevelGroupRepository } from '../../../cbi/cbi-level-group/repository/cbi-level-group.repository';
import { CbiRepository } from '../../../cbi/cbi/repository/cbi.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CbiUserRepository,
      CbiUserLevelRepository,
      UserRepository,
      CbiLevelRepository,
      CbiRepository,
      CbiLevelGroupRepository,
    ]),
    CbiLevelGroupAdminModule,
  ],
  //controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
