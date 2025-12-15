"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = url;
function url(resourcePath) {
    return `${process.env.APP_URL}/${resourcePath}`;
}
