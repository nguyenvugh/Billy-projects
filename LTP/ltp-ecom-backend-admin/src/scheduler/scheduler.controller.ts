import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @MessagePattern('admin-scheduler-initialize-schedulers')
  async initializeSchedulers() {
    return await this.schedulerService.initializeSchedulers();
  }

  @MessagePattern('admin-scheduler-find-scheduler-by-key')
  async findByKey(schedulerKey: string) {
    return await this.schedulerService.findByKey(schedulerKey);
  }

  @MessagePattern('admin-scheduler-update-scheduler-is-running')
  async updateSchedulerIsRunning(schedulerKey: string) {
    return await this.schedulerService.updateSchedulerIsRunning(schedulerKey);
  }

  @MessagePattern('admin-scheduler-update-scheduler-is-done')
  async updateSchedulerIsDone(schedulerKey: string) {
    return await this.schedulerService.updateSchedulerIsDone(schedulerKey);
  }
}
