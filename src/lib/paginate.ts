import { FindOptions } from "sequelize";
import { url } from "./url";


export interface PaginatedResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface PaginateOptions {
  page?: number;
  pageSize?: number;
  include?: FindOptions["include"];
  attributes?: FindOptions["attributes"];
  where?: FindOptions["where"];
  order?: FindOptions["order"];
}

export async function paginate<T>(model: any, options: PaginateOptions = {}): Promise<PaginatedResult<T> | false>
{

  const {
    page = 1,
    pageSize = 10,
    include = [],
    attributes = undefined,
    where = {},
    order = [],
  } = options;

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  try {

    const { rows: data, count: total } = await model.findAndCountAll({
      where,
      include,
      attributes,
      limit,
      offset,
      distinct: true,
      subQuery: false,
      order
    });

    if (total > 0) {
      return {
        data: data,
        total: total,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        pageSize: pageSize,
      };
    }
    
    return false;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export function paginationLinks(name: string, currentPage: number, totalPages: number)
{
    const route = url(name);
    return {
        first: `${route}?page=${1}`,
        last: `${route}?page=${totalPages}`,
        prev: currentPage > 1 ? `${route}?page=${currentPage - 1}` : null,
        next: currentPage < totalPages ? `${route}?page=${currentPage + 1}` : null
    }
}
