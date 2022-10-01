const { StatusCodes } = require('http-status-codes');

const errorsCustomMessage = (errors) => {
    return errors.details.reduce((acc, curr) => ({
        ...acc,
        [curr.path]: curr.message
    }), {});
};

module.exports = {
    response: (code, status, message, data) => {
        const result = {};
        result.code = code || StatusCodes.OK;
        result.status = status || 'OK';
        result.message = message;
        result.data = data;

        return result;
    },
    responseValidationErrors: (errors) => {
        const result = {};
        result.code = StatusCodes.UNPROCESSABLE_ENTITY;
        result.status = 'UNPROCESSABLE_ENTITY';
        result.message = 'The given data was invalid.';
        result.errors = errors;

        return result;
    },
    responseJoiValidationErrors: (errors) => {
        const result = {};
        result.code = StatusCodes.UNPROCESSABLE_ENTITY;
        result.status = 'UNPROCESSABLE_ENTITY';
        result.message = 'The given data was invalid.';
        result.errors = errorsCustomMessage(errors);

        return result;
    }
};
