import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { transports, format } from 'winston';

const winstonConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        // Strip color encoding from your winston output
        format.uncolorize(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    /*new winston_mysql({
      host: '210.245.110.19',
      port: '33061',
      user: 'nlt_dev',
      password: 'y79K7wsM',
      database: 'nlt_dev',
      table: 'gateway-server-logs',
    }),*/
    //new transports.Console(),
  ],
};

export default winstonConfig;
