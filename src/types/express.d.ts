import { AuthUserData } from ".";

declare global {
    namespace Express {
        interface Request {
            userData?: AuthUserData
        }
    }
}