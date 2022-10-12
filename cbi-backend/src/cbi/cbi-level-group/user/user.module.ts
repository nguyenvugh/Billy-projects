import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CbiLevelRepository } from '../../cbi-level/repository/cbi-level.repository';
import { CbiLevelGroupRepository } from '../repository/cbi-level-group.repository';
import { CbiUserLevelRepository } from '../../../cbi-user/cbi-user-level/repository/cbi-user-level.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CbiLevelRepository,
      CbiLevelGroupRepository,
      CbiUserLevelRepository,
    ]),
  ],
  //controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
