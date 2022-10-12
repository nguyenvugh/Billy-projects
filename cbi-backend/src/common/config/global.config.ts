import * as dotenv from 'dotenv';
dotenv.config();
const globalConfig = {
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  s3: {
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
    awsS3Region: process.env.AWS_S3_REGION,
    awsS3LimitSizeMb: +process.env.AWS_S3_LIMIT_SIZE_MB,
    awsS3PresignTimeOut: +process.env.AWS_S3_PRESIGN_TIME_OUT,
  },
  lambda: {
    awsLambdaSecret: process.env.AWS_LAMBDA_SECRET,
  },
  sendGrid: {
    emailFrom: process.env.SENDGRID_EMAIL_FROM,
    key: process.env.SENDGRID_KEY,
    apiKey: process.env.SENDGRID_API_KEY,
    templateId: process.env.SENDGRID_TEMPLATE_VERIFY_REGISTER_ID,
    templateForgetPassId: process.env.SENDGRID_TEMPLATE_FORGET_PASS_ID,
  },
  webClient: {
    url: process.env.WEB_CLIENT_URL,
  },
};

export default () => globalConfig;
export type IGlobalConfig = typeof globalConfig;
