import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './repositories/group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository, AdminRepository]),
    AdminModule,
    JwtCoreModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule { }
