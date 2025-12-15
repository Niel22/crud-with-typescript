import { RegisterUserDTO } from "../../dtos/userDTO";
import models from '../../models';


class Register {

    async execute(data: RegisterUserDTO): Promise<boolean>
    {
        const user = await models.User.create(data);

        if(user){
            return true;
        }

        return false;
    }
}

export default new Register();