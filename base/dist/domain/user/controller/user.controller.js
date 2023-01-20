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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const admin_create_user_input_dto_1 = require("../dto/admin-create-user-input.dto");
const admin_user_usecase_1 = require("../usecase/admin-user.usecase");
const swagger_1 = require("@nestjs/swagger");
const admin_create_user_output_dto_1 = require("../dto/admin-create-user-output.dto");
const service_auth_guard_1 = require("../../../infrastructure/auth/service-auth.guard");
let UserController = class UserController {
    adminUserUseCase;
    constructor(adminUserUseCase) {
        this.adminUserUseCase = adminUserUseCase;
    }
    async create(adminCreateUserInputDto) {
        const user = await this.adminUserUseCase.createUser(adminCreateUserInputDto);
        return {
            id: user.id,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        type: admin_create_user_output_dto_1.AdminCreateUserOutputDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_user_input_dto_1.AdminCreateUserInputDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UseGuards)(service_auth_guard_1.ServiceAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [admin_user_usecase_1.AdminUserUseCase])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map