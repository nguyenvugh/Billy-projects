import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [MicroserviceModule],
})
export class GroupModule { }
