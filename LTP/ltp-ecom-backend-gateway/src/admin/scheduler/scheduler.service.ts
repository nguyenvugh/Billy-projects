import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { BooleanValue } from '../../common/constants/global.constant';
import { AdminSchedulerKeyConst } from '../../common/constants/scheduler.constants';
import { AdminNewsEmailSubscriptionLimit } from '../../common/constants/queue-send-email.constants';
import { Scheduler, SchedulerModel } from './driver/base.driver';
import { SendNewsEmailSchedulerDriver } from './driver/send_news_email.driver';
import { AdminMicroserviceService } from '../admin-microservice/admin-microservice.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class SchedulerService {
  constructor(
    private sendNewsEmailSchedulerDriver: SendNewsEmailSchedulerDriver,
    private microserviceService: AdminMicroserviceService,
    private mailService: MailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async initializeSchedulers() {
    const listSchedulers: SchedulerModel[] =
      await this.microserviceService.call(
        'admin-scheduler-initialize-schedulers',
      );
    if (listSchedulers && listSchedulers.length) {
      listSchedulers.forEach((scheduler) => {
        // Check scheduler is activating
        if (BooleanValue.TRUE == scheduler.is_active) {
          this.initializeScheduler(scheduler);
        }
      });
    }
  }

  async initializeScheduler(scheduler: SchedulerModel) {
    const schedulerDriver: Scheduler = this.mapSchedulerKeyToSchedulerDriver(
      scheduler.key,
    );
    if (schedulerDriver) {
      const job = new CronJob(`${scheduler.interval}`, () => {
        switch (scheduler.key) {
          case AdminSchedulerKeyConst.ADMIN_SEND_NEWS_EMAIL:
            this.sendNewsEmailScheduler();
            break;
        }
      });
      this.schedulerRegistry.addCronJob(scheduler.key, job);
      job.start();
      // TODO: can not using factory pattern because can not use DI in class factory (SendNewsEmailSchedulerDriver)
      // TODO: need research to know why and how to fix it
      /*const job = new CronJob(`${scheduler.interval}`, () => {
        this.runScheduler(scheduler.key, schedulerDriver);
      });
      this.schedulerRegistry.addCronJob(scheduler.key, job);
      job.start();*/
    }
  }

  async sendNewsEmailScheduler() {
    const schedulerKey = AdminSchedulerKeyConst.ADMIN_SEND_NEWS_EMAIL;
    const schedulerGet: SchedulerModel = await this.getSchedulerByKey(
      schedulerKey,
    );
    if (!schedulerGet || !this.checkSchedulerCanRun(schedulerGet)) {
      return;
    }
    // Update scheduler is running
    await this.makeSchedulerIsRunning(schedulerKey);
    // Run
    const listEmails = await this.microserviceService.call(
      'admin-queue-send-email-get-list-emails-to-send',
      {
        body: {
          page: 1,
          limit: AdminNewsEmailSubscriptionLimit,
        },
      },
    );
    if (listEmails && listEmails.results && listEmails.results.length) {
      const promisesSendEmail: any[] = [];
      const emailsDelete: any[] = [];
      listEmails.results.forEach((item) => {
        emailsDelete.push(item.id);
        if (item.template) {
          promisesSendEmail.push(
            this.mailService.send(
              item.email,
              item.title,
              item.template,
              item.data,
            ),
          );
        }
      });
      if (promisesSendEmail.length) {
        await Promise.all(promisesSendEmail);
      }
      await this.microserviceService.call(
        'admin-queue-send-email-delete-many',
        {
          body: {
            ids: emailsDelete,
          },
        },
      );
    }
    // Update scheduler is done
    await this.makeSchedulerIsDone(schedulerKey);
  }

  /*
  async runScheduler(schedulerKey: string, schedulerDriver: Scheduler) {
    if (!schedulerKey || !schedulerDriver) {
      return;
    }
    const schedulerGet: SchedulerModel = await this.microserviceService.call(
      'admin-scheduler-find-scheduler-by-key',
      schedulerKey,
    );
    if (!schedulerGet) {
      return;
    }
    // Check scheduler is running or stop auto run
    if (
      BooleanValue.TRUE == schedulerGet.is_running ||
      BooleanValue.TRUE == schedulerGet.stop_auto_run
    ) {
      return;
    }
    // Update scheduler is running
    await this.microserviceService.call(
      'admin-scheduler-update-scheduler-is-running',
      schedulerKey,
    );
    // Run
    await schedulerDriver.run();
    // Update scheduler is done
    await this.microserviceService.call(
      'admin-scheduler-update-scheduler-is-done',
      schedulerKey,
    );
  }
  */

  private async getSchedulerByKey(
    schedulerKey: string,
  ): Promise<SchedulerModel> {
    return await this.microserviceService.call(
      'admin-scheduler-find-scheduler-by-key',
      schedulerKey,
    );
  }

  private checkSchedulerCanRun(scheduler: SchedulerModel) {
    // Check scheduler is running or stop auto run
    if (
      BooleanValue.TRUE == scheduler.is_running ||
      BooleanValue.TRUE == scheduler.stop_auto_run
    ) {
      return false;
    }

    return true;
  }

  private async makeSchedulerIsRunning(schedulerKey: string) {
    await this.microserviceService.call(
      'admin-scheduler-update-scheduler-is-running',
      schedulerKey,
    );
  }

  private async makeSchedulerIsDone(schedulerKey: string) {
    await this.microserviceService.call(
      'admin-scheduler-update-scheduler-is-done',
      schedulerKey,
    );
  }

  private mapSchedulerKeyToSchedulerDriver(schedulerKey: string): Scheduler {
    let schedulerDriver: Scheduler = null;
    switch (schedulerKey) {
      case AdminSchedulerKeyConst.ADMIN_SEND_NEWS_EMAIL:
        schedulerDriver = this.sendNewsEmailSchedulerDriver;
        break;
    }

    return schedulerDriver;
  }
}
