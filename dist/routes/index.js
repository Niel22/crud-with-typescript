"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const app_1 = __importDefault(require("../config/app"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/health', (req, res) => {
    res.send('App Name: ' + app_1.default.name);
});
// Auth Route
router.use('/auth', authRoutes_1.default);
router.use(authMiddleware_1.default);
router.use('/users', userRoutes_1.default);
exports.default = router;
