module.exports = {
    BAD_REQUEST: {
        FILE_IS_BIG: {
            customCode: '400.1',
            message: 'File is to big'
        },
        INCORRECT: {
            customCode: '400.3',
            message: 'Your password or Your email are incorect'
        },
        WRONG_FILE_FORMAT: {
            customCode: '400.2',
            message: 'Wrong File Format'
        },
        status: 400
    },
    CONFLICT: {
        EMAIL: {
            customCode: '409.1',
            message: 'email is already exist'
        },
        PEST: {
            customCode: '409.2',
            message: 'pest is already exist'
        },
        status: 409
    },
    FORBIDDEN: {
        customCode: '403.1',
        message: 'Forbidden',
        status: 403
    },
    INTERNAL_SERVER_ERROR: {
        WRONG_ACTION_TYPE: {
            customCode: '500.1',
            message: 'Wrong action type'
        },
        WRONG_TEMPLATE_NAME: {
            customCode: '500.2',
            message: 'Wrong template name'
        },
        status: 500
    },
    NOT_FOUND: {
        NOT_FOUND_PEST: {
            customCode: '404.1',
            message: 'Not Found Pest'
        },
        NOT_FOUND_USER: {
            customCode: '404.2',
            message: 'Not Found User'
        },
        status: 404
    },
    UNAUTHORIZED: {
        INVALID_TOKEN: {
            customCode: '401.1',
            message: 'Invalid token'
        },
        NO_ACTION_TOKEN: {
            customCode: '401.2',
            message: 'No action Token'
        },

        NO_TOKEN: {
            customCode: '401.3',
            message: 'No token'
        },
        status: 401
    }
}