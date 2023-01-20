"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const app_module_1 = require("./app.module");
const user_module_1 = require("./domain/user/user.module");
exports.routers = [
    {
        path: '/',
        module: app_module_1.AppModule,
        children: [
            {
                path: '/users',
                module: user_module_1.UserModule,
            },
        ],
    },
];
//# sourceMappingURL=app.routes.js.map