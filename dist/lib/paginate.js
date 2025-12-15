"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
exports.paginationLinks = paginationLinks;
const url_1 = require("./url");
async function paginate(model, options = {}) {
    const { page = 1, pageSize = 10, include = [], attributes = undefined, where = {}, order = [], } = options;
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
    }
    catch (error) {
        throw new Error(error.message);
    }
}
function paginationLinks(name, currentPage, totalPages) {
    const route = (0, url_1.url)(name);
    return {
        first: `${route}?page=${1}`,
        last: `${route}?page=${totalPages}`,
        prev: currentPage > 1 ? `${route}?page=${currentPage - 1}` : null,
        next: currentPage < totalPages ? `${route}?page=${currentPage + 1}` : null
    };
}
