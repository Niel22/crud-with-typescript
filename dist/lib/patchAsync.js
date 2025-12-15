"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRouterAsync = patchRouterAsync;
const express_1 = require("express");
/**
 * Patch Express Router globally to automatically handle async errors.
 * Call this once in your app/server entry file.
 */
function patchRouterAsync() {
    const originalRoute = express_1.Router.prototype.route;
    express_1.Router.prototype.route = function (path) {
        const route = originalRoute.call(this, path);
        const wrapAsync = (fn) => {
            return (req, res, next) => {
                Promise.resolve(fn(req, res, next)).catch(next);
            };
        };
        ["get", "post", "put", "delete", "patch", "options", "head"].forEach((method) => {
            const originalMethod = route[method];
            route[method] = function (...handlers) {
                const wrappedHandlers = handlers.map((h) => typeof h === "function" ? wrapAsync(h) : h);
                return originalMethod.apply(route, wrappedHandlers);
            };
        });
        return route;
    };
}
