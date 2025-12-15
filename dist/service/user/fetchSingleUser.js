"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
class FetchSingleUser {
    async execute(id) {
        const user = await models_1.default.User.findByPk(id);
        if (user) {
            return user;
        }
        return false;
    }
}
exports.default = new FetchSingleUser();
