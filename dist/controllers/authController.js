"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("../service/auth/register"));
const apiResonse_1 = require("../lib/apiResonse");
const login_1 = __importDefault(require("../service/auth/login"));
const userResource_1 = require("../resource/userResource");
class AuthController {
    async register(req, res) {
        if (await register_1.default.execute(req.body)) {
            return (0, apiResonse_1.success)(res, {}, "User Registered Successfully");
        }
        return (0, apiResonse_1.error)(res, "Problem Creating User");
    }
    async login(req, res) {
        const user = await login_1.default.execute(req.body);
        if (user) {
            return (0, apiResonse_1.success)(res, (0, userResource_1.userResource)(user), "User Logged In Successfully");
        }
        return (0, apiResonse_1.error)(res, "Invalid Credentials");
    }
}
exports.default = new AuthController();
