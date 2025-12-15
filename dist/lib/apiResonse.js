"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.validationError = exports.error = exports.success = void 0;
const success = (res, data = null, message = "Success") => {
    return res.status(200).json({
        message,
        data
    });
};
exports.success = success;
const error = (res, message = "Bad request") => {
    return res.status(400).json({
        message
    });
};
exports.error = error;
const validationError = (res, errors) => {
    return res.status(422).json({
        message: "Validation failed",
        errors
    });
};
exports.validationError = validationError;
const unauthorized = (res, message = "Unauthorized") => {
    return res.status(401).json({
        message
    });
};
exports.unauthorized = unauthorized;
