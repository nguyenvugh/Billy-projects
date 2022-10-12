import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { ListSchedulersConst } from '../common/constants/scheduler.constant';
import { BooleanValue } from '../common/constants';
import {
  generateMapDataWithKeyFieldPair,
  mergeArrays,
} from '../common/helpers/util.helper';
import { SchedulerRepository } from './repository/scheduler.repository';

@Injectable()
export class SchedulerService {
  constructor(private schedulerRepo: SchedulerRepository) {}

  async initializeSchedulers() {
    const schedulersInitialized: any[] = [];
    const schedulerKeys = ListSchedulersConst.map((scheduler) => {
      return scheduler.key;
    });
    if (!schedulerKeys || !schedulerKeys.length) {
      return schedulersInitialized;
    }
    let schedulersGet = await this.schedulerRepo.find({
      key: In(schedulerKeys),
    });
    if (!schedulersGet) {
      return schedulersInitialized;
    }
    let schedulersInsert: any[] = [];
    if (!schedulersGet.length) {
      schedulersInsert = ListSchedulersConst;
    } else {
      const mapExistedSchedulers = generateMapDataWithKeyFieldPair(
        'key',
        '',
        schedulersGet,
      );
      ListSchedulersConst.forEach((scheduler) => {
        if (!mapExistedSchedulers.hasOwnProperty(scheduler.key)) {
          schedulersInsert.push(scheduler);
        }
      });
    }
    const promises: any[] = [];
    if (schedulersInsert.length) {
      promises.push(this.schedulerRepo.save(schedulersInsert));
    }
    if (promises.length) {
      const results = await Promise.all(promises);
      schedulersGet = mergeArrays(schedulersGet, results[0]);
    }

    return schedulersGet;
  }

  async findByKey(schedulerKey: string) {
    if (!schedulerKey) {
      return null;
    }
    const schedulerGet = await this.schedulerRepo.findOne({
      where: {
        key: schedulerKey,
      },
    });
    if (!schedulerGet) {
      return null;
    }

    return schedulerGet;
  }

  async updateSchedulerIsRunning(schedulerKey: string) {
    if (!schedulerKey) {
      return null;
    }
    return await this.schedulerRepo.update(
      {
        key: schedulerKey,
      },
      {
        is_running: BooleanValue.TRUE,
      },
    );
  }

  async updateSchedulerIsDone(schedulerKey: string) {
    if (!schedulerKey) {
      return null;
    }
    return await this.schedulerRepo.update(
      {
        key: schedulerKey,
      },
      {
        is_running: BooleanValue.FALSE,
      },
    );
  }
}
