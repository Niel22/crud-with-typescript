
import { UserResponseDTO } from "../../dtos/userDTO";
import { paginate, PaginatedResult } from "../../lib/paginate";
import models from "../../models";

class FetchAllUser{

    async execute(page: number = 1): Promise<PaginatedResult<UserResponseDTO> | false>
    {
        const pageSize = 10;
        const user = await paginate<UserResponseDTO>(models.User, {
            page,
            pageSize
        });

        if(user){
            return user;
        }

        return false;
    }
}

export default new FetchAllUser();