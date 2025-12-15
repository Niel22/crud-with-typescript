
import { UserResponseDTO } from "../../dtos/userDTO";
import models from '../../models';

class FetchSingleUser {

    async execute(id: string): Promise<UserResponseDTO | false>
    {
        const user = await models.User.findByPk(id);

        if(user){
            return user;
        }

        return false;
    }
}

export default new FetchSingleUser();