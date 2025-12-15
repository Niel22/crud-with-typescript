"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResource = userResource;
exports.userCollection = userCollection;
const paginate_1 = require("../lib/paginate");
function userResource(user) {
    return {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        token: user.token && user.token
    };
}
function userCollection(users) {
    return {
        data: users.data.map(user => userResource(user)),
        meta: {
            total: users.total,
            currentPage: users.currentPage,
            totalPages: users.totalPages,
            pageSize: users.pageSize
        },
        links: (0, paginate_1.paginationLinks)('users', users.currentPage, users.totalPages)
    };
}
