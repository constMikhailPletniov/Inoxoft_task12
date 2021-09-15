
const { Pest, OAuth } = require('../database');
const { dataEnum, statusEnum, constants, errors } = require('../config');
const pestService = require('../services/pest.service');

module.exports = {

    createPest: async (req, res, next) => {
        try {
            const { body } = req;
            const token = req.get(constants.AUTHORIZATION);
            const current = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);
            await Pest.create({
                ...body,
                user: current.user._id
            });

            res.status(statusEnum.CREATE).
                json({ message: 'The pest is add to base' });

        } catch (err) {
            next(err);
        }
    },
    deletePestById: async (req, res, next) => {
        try {
            const { pest_id } = req.params;

            const pestDelete = await Pest.findByIdAndDelete(pest_id);

            res.status(statusEnum.OK).json(pestDelete);
        } catch (err) {
            next(err);
        }
    },
    getAllPests: async (req, res) => {
        try {

            const response = await pestService.findDynamicPest(req.query);

            res.status(statusEnum.OK).json(response);

        } catch (err) {
            res.status(errors.BAD_REQUEST.status).json(err.message);
        }
    },
    getPestsById: async (req, res, next) => {
        try {
            const { pest_id } = req.params;

            const findPest = await Pest.findById(pest_id);

            res.status(statusEnum.OK).json(findPest);

        } catch (err) {
            next(err);
        }
    },
    updatePest: async (req, res, next) => {
        try {
            const data = req.body;
            const { pest_id } = req.params;

            await Pest.findByIdAndUpdate(pest_id, data);

            res.status(statusEnum.OK).json({ message: 'The data was update' });

        } catch (err) {
            next(err);
        }
    }

}
