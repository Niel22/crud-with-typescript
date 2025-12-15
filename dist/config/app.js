"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig = {
    name: process.env.APP_NAME ?? '',
    port: process.env.APP_PORT ?? '',
    secret: process.env.APP_KEY ?? '',
    environment: process.env.NODE_ENV,
    url: process.env.APP_URL,
};
exports.default = appConfig;
// pm2 start dist/server.js --node-args="-r tsconfig-paths/register"
