"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const application_config_1 = require("../config/application.config");
const generate_token_command_1 = require("./commands/generate-token.command");
let CommandModule = class CommandModule {
};
CommandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: application_config_1.appConfig.serviceAuth.secret,
            }),
        ],
        providers: [generate_token_command_1.GenerateJWTTokenCommand],
    })
], CommandModule);
exports.CommandModule = CommandModule;
//# sourceMappingURL=commander.module.js.map