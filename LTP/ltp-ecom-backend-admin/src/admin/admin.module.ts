import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import HashHelper from 'src/common/helpers/hash.helper';
import { GroupRepository } from 'src/group/repositories/group.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './repositories/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository, GroupRepository]),
    ConfigService,
    HashHelper,
    JwtCoreModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, HashHelper],
  exports: [AdminService],
})
export class AdminModule { }
