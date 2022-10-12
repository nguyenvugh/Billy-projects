import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CbiRepository } from '../../cbi/repository/cbi.repository';
import { CbiLevelRepository } from '../repository/cbi-level.repository';
import { CbiUserLevelRepository } from '../../../cbi-user/cbi-user-level/repository/cbi-user-level.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CbiRepository,
      CbiLevelRepository,
      CbiUserLevelRepository,
    ]),
  ],
  //controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
