export const SchedulerKeyConst = {
  ADMIN_SEND_NEWS_EMAIL: 'ADMIN_SEND_NEWS_EMAIL',
};

export const ListSchedulersConst = [
  {
    key: SchedulerKeyConst.ADMIN_SEND_NEWS_EMAIL,
    name: 'Send newsletter email in admin. Run on every minute.',
    interval: '0 * * * * *',
  },
];
