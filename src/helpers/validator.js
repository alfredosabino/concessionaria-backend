const { getMessage } = require('./messages');

const getValidatorError = (error, messegaPath) => {
    if (!error) return null;

    const errorMessages = {};
    error.details.map((detail) => {
        const message = detail.message;
        const type = detail.type;
        const key = detail.context.key;
        const path = `${messegaPath}.${key}.${type}`;

        const customMessage = getMessage(path);
        if (!customMessage) {
            console.log('customMessage not found for path: ', path)
        }
        errorMessages[key] = customMessage || message;
    });

    return errorMessages;
};

module.exports = { getValidatorError, getMessage };