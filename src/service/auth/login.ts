import { LoginUserDTO, UserResponseDTO } from '../../dtos/userDTO';
import { generateWebToken } from '../../lib/jwt';
import models from '../../models';

class Login {

    async execute(data: LoginUserDTO): Promise<UserResponseDTO | false>
    {

        const user = await models.User.findOne({ 
            where: { email: data.email },
        });

        if (await user.comparePassword(data.password)) {
            
            user.token = generateWebToken(user);

            return user;
        }

        return false;
    }
}

export default new Login();