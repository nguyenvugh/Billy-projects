import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import HashHelper from 'src/common/helpers/hash.helper';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository]),
    HashHelper,
    JwtCoreModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, HashHelper],
})
export class UsersModule { }
