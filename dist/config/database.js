"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseConfig = {
    host: process.env.DB_HOST ?? '',
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT) ?? 3306,
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASS ?? '',
    name: process.env.DB_NAME ?? '',
};
exports.default = databaseConfig;
