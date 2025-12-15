"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginRequest_1 = __importDefault(require("../request/loginRequest"));
const authController_1 = __importDefault(require("../controllers/authController"));
const registerRequest_1 = __importDefault(require("../request/registerRequest"));
const authRoutes = (0, express_1.Router)();
authRoutes.post('/login', loginRequest_1.default, authController_1.default.login);
authRoutes.post('/register', registerRequest_1.default, authController_1.default.register);
exports.default = authRoutes;
