
import { Request, Response } from "express";
import fetchAllUser from "../service/user/fetchAllUser";
import { error, success } from "../lib/apiResonse";
import { userCollection, userResource } from "../resource/userResource";
import fetchSingleUser from "../service/user/fetchSingleUser";

class UserController {

    async index(req: Request, res: Response): Promise<Response>
    {
        const page = parseInt(req.query.page as string) || 1;
        const users = await fetchAllUser.execute(page);

        if(users){
            return success(res, userCollection(users), "All Users");
        }

        return success(res, {}, "No User found");
    }

    async show(req: Request, res: Response): Promise<Response>
    {
        const user = await fetchSingleUser.execute(req.params.id);

        if(user){
            return success(res, userResource(user), "Single User");
        }

        return error(res, "User not Found");
    }
}

export default new UserController();