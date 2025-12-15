"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const app_2 = __importDefault(require("./config/app"));
const models_1 = __importDefault(require("./models"));
models_1.default.sequelize.sync().then(() => {
    console.log("All Database Table Synced");
    app_1.default.listen(app_2.default.port, () => console.log(`Server running on 127.0.0.1: ${app_2.default.port}`));
});
