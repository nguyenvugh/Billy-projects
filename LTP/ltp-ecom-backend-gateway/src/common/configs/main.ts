import { MicroserviceConsts } from '../constants/microservices';

export default () => ({
  microservices: {
    admin: {
      name: MicroserviceConsts.IDENTITY.ADMIN,
      host: process.env.ADMIN_SERVICE_HOST || '127.0.0.1',
      port: parseInt(process.env.ADMIN_SERVICE_PORT, 10) || 50001,
    },
    customer: {
      name: MicroserviceConsts.IDENTITY.CUSTOMER,
      host: process.env.CUSTOMER_SERVICE_HOST || '127.0.0.1',
      port: parseInt(process.env.CUSTOMER_SERVICE_PORT, 10) || 50002,
    },
  },
  web: {
    admin: {
      root: process.env.ADMIN_WEB_URL || '',
    },
    customer: {
      root: process.env.CUSTOMER_WEB_URL || '',
      email_support: process.env.CUSTOMER_EMAIL_SUPPORT || '',
      phone_support: process.env.CUSTOMER_PHONE_SUPPORT || '',
    },
  },
  logging: {
    db_name: process.env.LOGGING_TABLE_NAME || 'gateway-server-logs',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
    expire: process.env.JWT_EXPIRE || '2d',
  },
  email: {
    service: process.env.SMTP_SERVICE || 'gmail',
    gmail: {
      host: process.env.SMTP_GMAIL_SERVICE_HOST || 'smtp.gmail.com',
      username: process.env.SMTP_GMAIL_USER_NAME || '',
      from_email: process.env.SMTP_GMAIL_FROM_EMAIL || '',
      password: process.env.SMTP_GMAIL_USER_PASSWORD || '',
    },
    sendgrid: {
      host: process.env.SMTP_SENDGRID_SERVICE_HOST || 'smtp.sendgrid.net',
      username: process.env.SMTP_SENDGRID_USER_NAME || '',
      from_email: process.env.SMTP_SENDGRID_FROM_EMAIL || '',
      password: process.env.SMTP_SENDGRID_USER_PASSWORD || '',
    },
  },
  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.FIREBASE_APP_ID || '',
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
    },
  },
});
