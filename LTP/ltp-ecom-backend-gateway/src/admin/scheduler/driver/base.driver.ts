export interface Scheduler {
  run(): Promise<void>;
}

export interface SchedulerModel {
  id: number;
  key: string;
  name: string;
  interval: string;
  is_running: number;
  stop_auto_run: number;
  is_active: number;
}
