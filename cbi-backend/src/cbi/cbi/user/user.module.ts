import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CbiRepository } from '../repository/cbi.repository';
import { UserModule as CbiLevelUserModule } from '../../cbi-level/user/user.module';
import { UserModule as CbiLevelGroupUserModule } from '../../cbi-level-group/user/user.module';
import { UserModule as CbiUserLevelUserModule } from '../../../cbi-user/cbi-user-level/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CbiRepository]),
    CbiLevelUserModule,
    CbiUserLevelUserModule,
    CbiLevelGroupUserModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
