export default () => ({
  awsS3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  },
  db: {
    mysql: {
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || '',
      sync_db:
        process.env.MYSQL_SYNC_DB && 'true' == process.env.MYSQL_SYNC_DB
          ? true
          : false,
      logging:
        process.env.MYSQL_LOGGING && 'true' == process.env.MYSQL_LOGGING
          ? true
          : false,
    },
  },
  logging: {
    db_name: process.env.LOGGING_TABLE_NAME || 'customer-server-logs',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
    expire: process.env.JWT_EXPIRE || '2d',
  },
  other: {
    salt: parseInt(process.env.SALT, 10) || 10,
  },
});
