"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventLogger_1 = __importDefault(require("./lib/eventLogger"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./lib/errorHandler"));
const patchAsync_1 = require("./lib/patchAsync");
const app = (0, express_1.default)();
(0, patchAsync_1.patchRouterAsync)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(eventLogger_1.default.logger);
app.use('/api', routes_1.default);
app.use(errorHandler_1.default.notFound);
app.use(errorHandler_1.default.errorHandler);
exports.default = app;
