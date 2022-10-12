export default () => ({
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
    salt: process.env.SALT,
  },
  payment: {
    driver: process.env.PAYMENT_ONLINE_DRIVER || 'onepay',
    test_mode:
      process.env.PAYMENT_TEST_MODE && 'true' == process.env.PAYMENT_TEST_MODE
        ? true
        : false,
    onepay: {
      sandbox: {
        hash_key: process.env.ONEPAY_SANDBOX_HASH_KEY || '',
      },
      request_payment: {
        sandbox: {
          url: process.env.ONEPAY_SANDBOX_REQUEST_PAYMENT_LINK || '',
          parameters: {
            vpc_Version: '2',
            vpc_AccessCode: process.env.ONEPAY_SANDBOX_ACCESS_CODE || '',
            vpc_Amount: 0,
            vpc_Command: 'pay',
            vpc_Currency: 'VND',
            vpc_Locale: 'vn',
            vpc_Merchant: process.env.ONEPAY_SANDBOX_MERCHANT || '',
            vpc_MerchTxnRef: '',
            vpc_OrderInfo: '',
            vpc_ReturnURL: '',
            vpc_TicketNo: '',
          },
        },
        production: {
          url: process.env.ONEPAY_PRODUCTION_REQUEST_PAYMENT_LINK || '',
          parameters: {
            vpc_Version: '2',
            vpc_AccessCode: process.env.ONEPAY_PRODUCTION_ACCESS_CODE || '',
            vpc_Amount: 0,
            vpc_Command: 'pay',
            vpc_Currency: 'VND',
            vpc_Locale: 'vn',
            vpc_Merchant: process.env.ONEPAY_PRODUCTION_MERCHANT || '',
            vpc_MerchTxnRef: '',
            vpc_OrderInfo: '',
            vpc_ReturnURL: '',
            vpc_TicketNo: '',
          },
        },
        global_parameters: {
          AgainLink: process.env.ONEPAY_AGAIN_LINK || '',
          Title: process.env.ONEPAY_TITLE || '',
        },
      },
    },
  },
  shipping: {
    driver: process.env.SHIPPING_DRIVER || 'ghtk',
    test_mode:
      process.env.SHIPPING_TEST_MODE && 'true' == process.env.SHIPPING_TEST_MODE
        ? true
        : false,
    ghtk: {
      sandbox: {
        api_key: process.env.GHTK_SANDBOX_API_KEY || '',
        api_url: process.env.GHTK_SANDBOX_API_URL || '',
        ipn_secret_key: process.env.GHTK_SANDBOX_IPN_SECRET_KEY || '',
        ipn_expire_time: process.env.GHTK_SANDBOX_IPN_EXPIRE_TIME || '',
      },
      production: {
        api_key: process.env.GHTK_PRODUCTION_API_KEY || '',
        api_url: process.env.GHTK_PRODUCTION_API_URL || '',
        ipn_secret_key: process.env.GHTK_PRODUCTION_IPN_SECRET_KEY || '',
        ipn_expire_time: process.env.GHTK_PRODUCTION_IPN_EXPIRE_TIME || '',
      },
    },
    ghn_disabled:
      process.env.SHIPPING_GHN_DISABLED &&
      'true' == process.env.SHIPPING_GHN_DISABLED
        ? true
        : false,
  },
  awsS3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  },
});
