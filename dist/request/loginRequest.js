"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const apiResonse_1 = require("../lib/apiResonse");
const utils_1 = require("../utils");
const schema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
async function LoginRequest(req, res, next) {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return (0, apiResonse_1.validationError)(res, (0, utils_1.FormatJoiErrors)(error.details));
    }
    req.body = value;
    next();
}
exports.default = LoginRequest;
