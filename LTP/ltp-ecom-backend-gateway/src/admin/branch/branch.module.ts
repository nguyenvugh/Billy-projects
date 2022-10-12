import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  imports: [MicroserviceModule],
})
export class BranchModule { }
