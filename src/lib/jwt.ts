
import * as jwt from 'jsonwebtoken';
import { UUID } from 'node:crypto';
import { UserResponseDTO } from '../dtos/userDTO';
import appConfig from '../config/app';
import { JwtPayload } from '../types';

export const generateWebToken = (user: UserResponseDTO) => {
    return jwt.sign(
        {
            userId: user.uuid,
        },
        appConfig.secret,
        { expiresIn: "1d" }
    );
}

export const verifyWebToken = (token: string): UUID =>
{
    const decoded = jwt.verify(token, appConfig.secret) as JwtPayload;
    return decoded.userId;
}