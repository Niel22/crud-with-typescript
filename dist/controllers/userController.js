"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchAllUser_1 = __importDefault(require("../service/user/fetchAllUser"));
const apiResonse_1 = require("../lib/apiResonse");
const userResource_1 = require("../resource/userResource");
const fetchSingleUser_1 = __importDefault(require("../service/user/fetchSingleUser"));
class UserController {
    async index(req, res) {
        const page = parseInt(req.query.page) || 1;
        const users = await fetchAllUser_1.default.execute(page);
        if (users) {
            return (0, apiResonse_1.success)(res, (0, userResource_1.userCollection)(users), "All Users");
        }
        return (0, apiResonse_1.success)(res, {}, "No User found");
    }
    async show(req, res) {
        const user = await fetchSingleUser_1.default.execute(req.params.id);
        if (user) {
            return (0, apiResonse_1.success)(res, (0, userResource_1.userResource)(user), "Single User");
        }
        return (0, apiResonse_1.error)(res, "User not Found");
    }
}
exports.default = new UserController();
