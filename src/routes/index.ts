import { Request, Response, Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import appConfig from "../config/app";
import authMiddleware from "../middlewares/authMiddleware";

const router: Router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.send('App Name: ' + appConfig.name);
});

// Auth Route
router.use('/auth', authRoutes);

router.use(authMiddleware);

router.use('/users', userRoutes);

export default router;