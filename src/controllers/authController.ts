import { Request, Response } from "express";
import { LoginUserDTO, RegisterUserDTO } from "../dtos/userDTO";
import register from "../service/auth/register";
import { error, success } from "../lib/apiResonse";
import login from "../service/auth/login";
import { userResource } from "../resource/userResource";


class AuthController {

    async register(req: Request<{}, {}, RegisterUserDTO>, res: Response): Promise<Response>
    {

        if(await register.execute(req.body)) 
        {
            return success(res, {}, "User Registered Successfully");
        }

        return error(res, "Problem Creating User");

    }

    async login(req: Request<{}, {}, LoginUserDTO>, res: Response) {
        const user = await login.execute(req.body);

        if(user){
            return success(res, userResource(user), "User Logged In Successfully");
        }

        return error(res, "Invalid Credentials");

    }
}

export default new AuthController();