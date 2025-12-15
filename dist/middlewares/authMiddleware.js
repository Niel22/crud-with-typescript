"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../lib/jwt");
const apiResonse_1 = require("../lib/apiResonse");
const models_1 = __importDefault(require("../models"));
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        try {
            const userId = (0, jwt_1.verifyWebToken)(token);
            if (!userId) {
                return (0, apiResonse_1.unauthorized)(res, "invalid token. Authentication failed.");
            }
            const user = await models_1.default.User.findByPk(userId);
            if (user) {
                req.userData = {
                    id: user.uuid,
                    name: user.name,
                    email: user.email
                };
                return next();
            }
        }
        catch (err) {
            return (0, apiResonse_1.unauthorized)(res, err.message);
        }
    }
    return (0, apiResonse_1.unauthorized)(res, "invalid token. Authentication failed.");
}
exports.default = authMiddleware;
