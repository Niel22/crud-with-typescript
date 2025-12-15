
import { Router } from "express";
import LoginRequest from "../request/loginRequest";
import authController from "../controllers/authController";
import RegisterRequest from "../request/registerRequest";

const authRoutes: Router = Router();

authRoutes.post('/login', LoginRequest, authController.login);
authRoutes.post('/register', RegisterRequest, authController.register);

export default authRoutes;