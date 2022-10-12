import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { SchedulerRepository } from './repository/scheduler.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchedulerRepository])],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}
