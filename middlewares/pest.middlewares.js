
const { Pest } = require('../database');
const { errors, statusEnum } = require('../config');
const { ErrorHandler } = require('../errors/errors.handler');
const { pestValidator } = require('../validator');

const getByDynamicParam = (
    paramsName,
    searchIn = 'body', paramDb = paramsName
) => async (req, res, next) => {
    try {
        const value = req[searchIn][paramsName];
        const pest = await Pest.findOne({ [paramDb]: value });
        req.pest = pest;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getByDynamicParam,
    isPestExistId: (req, res, next) => {
        try {

            const { pest } = req;
            if (!pest) {
                throw new ErrorHandler(
                    errors.NOT_FOUND.status,
                    errors.NOT_FOUND.NOT_FOUND_PEST.customCode
                );
            }

            next();

        } catch (err) {
            next(err);
        }
    },
    isValidName: (req, res, next) => {
        try {

            const { pest } = req;

            if (pest) {
                throw new ErrorHandler(
                    errors.CONFLICT.status,
                    errors.CONFLICT.PEST.customCode
                );
            }
            next();

        } catch (err) {
            next(err);
        }
    },
    isValidPestData: async (req, res, next) => {
        try {
            const { err } = await pestValidator.
                pestsCreateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(errors.BAD_REQUEST.status, err.
                    details[statusEnum.ZERO].
                    message);
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    isValidUpdatePestData: async (req, res, next) => {
        try {
            const { err } = await pestValidator.
                pestsUpdateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(errors.BAD_REQUEST.status, err.
                    details[statusEnum.ZERO].
                    message);
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}
