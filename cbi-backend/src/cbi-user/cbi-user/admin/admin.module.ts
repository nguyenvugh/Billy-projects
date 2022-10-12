import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CbiUserRepository } from '../repository/cbi-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CbiUserRepository])],
  //controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
