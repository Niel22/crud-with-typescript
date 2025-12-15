"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../lib/jwt");
const models_1 = __importDefault(require("../../models"));
class Login {
    async execute(data) {
        const user = await models_1.default.User.findOne({
            where: { email: data.email },
        });
        if (await user.comparePassword(data.password)) {
            user.token = (0, jwt_1.generateWebToken)(user);
            return user;
        }
        return false;
    }
}
exports.default = new Login();
