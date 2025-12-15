"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_1 = require("../../lib/paginate");
const models_1 = __importDefault(require("../../models"));
class FetchAllUser {
    async execute(page = 1) {
        const pageSize = 10;
        const user = await (0, paginate_1.paginate)(models_1.default.User, {
            page,
            pageSize
        });
        if (user) {
            return user;
        }
        return false;
    }
}
exports.default = new FetchAllUser();
