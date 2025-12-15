import { UUID } from "crypto"

export interface LoginUserDTO{
    email: string,
    password: string
}

export interface UserResponseDTO {
    uuid: UUID,
    name: string,
    email: string,
    token? : string
}

export interface RegisterUserDTO {
    name: string,
    email: string,
    password: string
}