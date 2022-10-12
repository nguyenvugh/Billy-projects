import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CbiUserRepository } from '../repository/cbi-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CbiUserRepository])],
  //controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
