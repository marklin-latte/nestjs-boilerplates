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
var AdminUserUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const pubsub_provider_1 = require("../../../infrastructure/pubsub/pubsub.provider");
const database_provider_1 = require("../../../infrastructure/database/database.provider");
const base_usecase_1 = require("../../common/base.usecase");
const user_repository_1 = require("../repository/user.repository");
const user_dm_1 = require("../domainModel/user.dm");
const user_constant_1 = require("../../../constants/user.constant");
let AdminUserUseCase = AdminUserUseCase_1 = class AdminUserUseCase extends base_usecase_1.BaseUseCase {
    logger = new common_1.Logger(AdminUserUseCase_1.name);
    userRepository;
    constructor(pubsubService, unitOfWork) {
        super(unitOfWork, pubsubService);
        this.userRepository = this.unitOfWork.registerRepository(user_repository_1.UserRepository);
    }
    async createUser(adminCreateUserInputDto) {
        const user = new user_dm_1.User();
        user.name = adminCreateUserInputDto.name;
        user.coverImage = {
            id: adminCreateUserInputDto.coverImageId,
        };
        user.role = adminCreateUserInputDto.role;
        user.name = adminCreateUserInputDto.name;
        user.permissions = adminCreateUserInputDto.permissionIds.map((id) => {
            return {
                id,
                rule: 'test',
                requiredRole: user_constant_1.ROLE.PADA,
            };
        });
        const result = await this.userRepository.createUser(user);
        this.logger.log(`${result.name} has been created !!!`);
        return result;
    }
    async findUserById(userId) {
        return this.userRepository.findOne(userId);
    }
};
AdminUserUseCase = AdminUserUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(pubsub_provider_1.ProviderTokens.PUBSUB_SERVICE)),
    __param(1, (0, common_1.Inject)(database_provider_1.ProviderTokens.UNIT_OF_WORK)),
    __metadata("design:paramtypes", [Object, Object])
], AdminUserUseCase);
exports.AdminUserUseCase = AdminUserUseCase;
//# sourceMappingURL=admin-user.usecase.js.map