"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("./appError");
const eventLogger_1 = __importDefault(require("./eventLogger"));
class ErrorHandler extends Error {
    notFound(req, res, next) {
        next(new appError_1.AppError(`Route ${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} does not exist`, 404));
    }
    errorHandler(error, req, res, next) {
        const statusCode = error instanceof appError_1.AppError ? error.statusCode : res.statusCode || 500;
        eventLogger_1.default.logEvents(`${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${error.name}: ${error.message}`, "errorLog.txt");
        // if (error instanceof multer.MulterError) {
        //     res.status(400).json({
        //         message: `Multer error: ${error.message} on field '${error.field}'`
        //     });
        //     return;
        // }
        res.status(statusCode).json({
            message: error.message || "An unexpected error occurred",
            stack: process.env.NODE_ENV === "production"
                ? "Enable development mode for stack trace"
                : error.stack
        });
    }
}
exports.default = new ErrorHandler();
