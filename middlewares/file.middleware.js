const { ErrorHandler } = require("../errors/errors.handler");
const { constants, errors } = require('../config');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if (!req.files || !req.files.avatar) {
                next();
                return;
            }
            const { name, size, mimetype } = avatar;

            if (!constants.PHOTO_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(errors.BAD_REQUEST.status,
                    errors.BAD_REQUEST.WRONG_FILE_FORMAT.customCode);
            }

            if (size > constants.MAX_SIZE_AVATAR) {
                throw new ErrorHandler(errors.BAD_REQUEST.status,
                    errors.BAD_REQUEST.FILE_IS_BIG.customCode);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}