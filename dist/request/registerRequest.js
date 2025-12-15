"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const models_1 = __importDefault(require("../models"));
const apiResonse_1 = require("../lib/apiResonse");
const utils_1 = require("../utils");
const schema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
async function RegisterRequest(req, res, next) {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return (0, apiResonse_1.validationError)(res, (0, utils_1.FormatJoiErrors)(error.details));
    }
    const existingEmail = await models_1.default.User.findOne({ where: { email: value.email } });
    if (existingEmail) {
        return (0, apiResonse_1.validationError)(res, (0, utils_1.FormatError)("email", "this email already exist"));
    }
    req.body = value;
    next();
}
exports.default = RegisterRequest;
