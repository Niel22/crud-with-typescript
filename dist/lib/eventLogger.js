"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class EventLogger {
    constructor() {
        this.logger = this.logger.bind(this);
    }
    async logEvents(message, logName) {
        const dateTime = `${(0, date_fns_1.format)(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
        const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
        const logDir = path_1.default.join(process.cwd(), "logs");
        await promises_1.default.mkdir(logDir, { recursive: true });
        await promises_1.default.appendFile(path_1.default.join(logDir, logName), logItem);
    }
    logger(req, res, next) {
        const origin = req.headers.origin || "Unknown Origin";
        this.logEvents(`${req.method}\t${origin}\t${req.url}`, "reqLog.txt").catch(console.error);
        console.log(`${req.method}\t${req.path}`);
        next();
    }
}
exports.default = new EventLogger();
