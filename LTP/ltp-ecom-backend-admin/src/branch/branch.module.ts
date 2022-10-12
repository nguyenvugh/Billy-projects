import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/city/schemas/city.schema';
import { District } from 'src/district/schemas/district.schema';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { Ward } from 'src/ward/schemas/ward.schema';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchRepository } from './repositories/branch.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchRepository]),
    TypeOrmModule.forFeature([City, District, Ward]),
    JwtCoreModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule { }
