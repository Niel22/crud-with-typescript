import { paginationLinks } from "../lib/paginate";



export interface CollectionResponseDTO<T> {
    data: T[];
    meta: {
        total: number;
        currentPage: number;
        totalPages: number;
        pageSize: number;
    };
    links: ReturnType<typeof paginationLinks>;
}