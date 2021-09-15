

const express = require('express');
const expFileUp = require('express-fileupload');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');


require('dotenv').config();

const cronJob = require('./cron');
const { errors, statusEnum } = require('./config');
const { adminRouter, authRouter, userRouter, pestRouter } = require('./router');
const mongoose = require('mongoose');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

mongoose.connect(statusEnum.DB_MONGO);

if (statusEnum.ENV === 'dev') {
    app.use(morgan('dev'));
}

app.use(cors({ origin: _confCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));


app.use('/docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explore: true }));
app.use(helmet());
app.use(expFileUp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/superAdmin', adminRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pest', pestRouter);


app.use(_mainErrorHandler);

app.listen(statusEnum.PORT, () => {
    console.log(`Port ${statusEnum.PORT} working...`);
    cronJob();
});


function _mainErrorHandler(err, req, res, next) {
    res.status(err.status ||
        errors.INTERNAL_SERVER_ERROR.status).
        json({
            message: err.message || 'Unknown Error',
            customCode: err.customCode,
            data: err.data
        })
}

function _confCors(origin, callback) {

    const whiteList = statusEnum.ALLOW_ACCESS.split(';');

    if (!origin) {

        return callback(null, true);

    }
    if (!whiteList.includes(origin)) {

        return callback(new Error('Cors not allowed'), false)

    }

    return callback(null, true);
}

