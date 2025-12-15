
import { NextFunction, Request, Response } from "express";
import { verifyWebToken } from "../lib/jwt";
import { unauthorized } from "../lib/apiResonse";
import models from '../models';


async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer")) {

        const token = authHeader.split(" ")[1];

        try {
            const userId = verifyWebToken(token);

            if (!userId) {
                return unauthorized(res, "invalid token. Authentication failed.");
            }

            const user = await models.User.findByPk(userId);

            if (user) {
                req.userData = {
                    id: user.uuid,
                    name: user.name,
                    email: user.email
                };

                return next();
            }
        } catch (err: any) {
            return unauthorized(res, err.message);
        }
    }

    return unauthorized(res, "invalid token. Authentication failed.");
}

export default authMiddleware;