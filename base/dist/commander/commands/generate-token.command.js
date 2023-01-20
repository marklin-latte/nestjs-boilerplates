"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GenerateJWTTokenCommand_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJWTTokenCommand = void 0;
const nest_commander_1 = require("nest-commander");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
let GenerateJWTTokenCommand = GenerateJWTTokenCommand_1 = class GenerateJWTTokenCommand extends nest_commander_1.CommandRunner {
    jwtService;
    logger = new common_1.Logger(GenerateJWTTokenCommand_1.name);
    constructor(jwtService) {
        super();
        this.jwtService = jwtService;
    }
    async run(inputs) {
        const serviceName = inputs[0];
        const payload = { service: serviceName, createdAt: Date.now() };
        const token = this.jwtService.sign(payload);
        this.logger.log(`Generate the service#${serviceName} token`);
        console.log(token);
    }
};
GenerateJWTTokenCommand = GenerateJWTTokenCommand_1 = __decorate([
    (0, nest_commander_1.Command)({
        name: 'generate-service-token',
        arguments: '<serviceName>',
        description: 'Generate jwt token for service',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], GenerateJWTTokenCommand);
exports.GenerateJWTTokenCommand = GenerateJWTTokenCommand;
//# sourceMappingURL=generate-token.command.js.map