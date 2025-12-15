import { UUID } from "crypto";

export interface AuthUserData{
    id: UUID,
    name: string,
    email: string
}

export interface JwtPayload {
    userId: UUID
}