const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors/errors.handler');
const { errors, statusEnum } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, statusEnum.SALT),

    compare: async (password, hashpassword) => {

        const isPassMatched = await bcrypt.compare(password, hashpassword);

        if (!isPassMatched) {
            throw new ErrorHandler(
                errors.BAD_REQUEST.status,
                errors.BAD_REQUEST.INCORRECT.customCode
            );
        }

    }
}
