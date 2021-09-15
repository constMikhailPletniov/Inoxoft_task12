

module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access',
    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET || 'action',
    ALLOW_ACCESS: process.env.ALLOW_ACCESS || 'http://localhost:4200;http://localhost:3000',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || 'abba',
    AWS_S3_NAME: process.env.AWS_S3_NAME || 'mikhail-inoxoft',
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'region',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || 'secret',
    CREATE: 201,
    MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb+srv:',
    DB_MONGO: process.env.DB_MONGO || 'mongodb://localhost:27017/inoxoft',
    EMAIL: process.env.EMAIL || 'test@gmail.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '12345',
    ENV: process.env.ENV || '?',
    FIRST_LOGIN_TOKEN_SECRET: process.env.FIRST_LOGIN_TOKEN_SECRET ||
        'firstLogin',
    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET ||
        'forgotPassword',
    FRONTED_URL: 'https://inoxoft.com/',
    NO_CONTENT: 204,
    OK: 200,
    PORT: process.env.PORT || 5001,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',
    SALT: 7,
    STANDART_PASS: process.env.STANDART_PASS || '12345',
    SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || 'Misha',
    ZERO: 0
}
