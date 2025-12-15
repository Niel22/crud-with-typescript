import { CollectionResponseDTO } from "../dtos/responseDTO";
import { UserResponseDTO } from "../dtos/userDTO";
import { PaginatedResult, paginationLinks } from "../lib/paginate";



export function userResource(user: UserResponseDTO): UserResponseDTO
{
    return {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        token: user.token && user.token
    }

}

export function userCollection(users: PaginatedResult<UserResponseDTO>): CollectionResponseDTO<UserResponseDTO>
{
    return {
        data: users.data.map(user => userResource(user)),
        meta: {
            total: users.total,
            currentPage: users.currentPage,
            totalPages: users.totalPages,
            pageSize: users.pageSize
        },
        links: paginationLinks('users', users.currentPage, users.totalPages)
    };
}
