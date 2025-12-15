"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatJoiErrors = FormatJoiErrors;
exports.FormatError = FormatError;
function FormatJoiErrors(errorDetails) {
    return errorDetails.map((err) => ({
        field: err.path[0],
        message: err.message.replace(/['"]+/g, '')
    }));
}
function FormatError(fieldName, message) {
    return [{ field: fieldName, message: message }];
}
