"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
class Register {
    async execute(data) {
        const user = await models_1.default.User.create(data);
        if (user) {
            return true;
        }
        return false;
    }
}
exports.default = new Register();
