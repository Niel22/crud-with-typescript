import { Router } from "express";
import userController from "../controllers/userController";

const userRoutes: Router = Router();

userRoutes.get('/', userController.index);
userRoutes.get('/:id', userController.show);

export default userRoutes;