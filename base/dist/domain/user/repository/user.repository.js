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
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const permission_entity_1 = require("../entity/permission.entity");
const image_entity_1 = require("../entity/image.entity");
const image_constant_1 = require("../../../constants/image.constant");
const typeorm_1 = require("typeorm");
const base_repository_1 = require("../../common/base.repository");
let UserRepository = UserRepository_1 = class UserRepository extends base_repository_1.BaseRepository {
    logger = new common_1.Logger(UserRepository_1.name);
    userDataMapper;
    permissionDataMapper;
    imageDataMapper;
    constructor(unitOfWork) {
        super(unitOfWork);
        this.userDataMapper = this.unitOfWork.registerEntity(user_entity_1.User);
        this.permissionDataMapper =
            this.unitOfWork.registerEntity(permission_entity_1.Permission);
        this.imageDataMapper = this.unitOfWork.registerEntity(image_entity_1.Image);
    }
    async createUser(user) {
        const newUser = new user_entity_1.User();
        newUser.name = user.name;
        newUser.role = user.role;
        const imageResult = await this.imageDataMapper.save({
            source: image_constant_1.SOURCE.GCP,
        });
        const userResult = await this.userDataMapper.save({
            name: user.name,
            role: user.role,
            coverImageId: imageResult.id,
            permissionIds: user.permissions.map((permission) => permission.id),
        });
        const permissions = await this.permissionDataMapper.find({
            where: {
                id: (0, typeorm_1.In)(user.permissions.map((p) => p.id)),
            },
        });
        return {
            id: userResult.name,
            name: userResult.name,
            coverImage: {
                id: imageResult.id,
                url: `https://hahow.in/images/${imageResult.id}`,
            },
            role: userResult.role,
            permissions: permissions.map((p) => {
                return {
                    id: p.id,
                    rule: p.rule,
                    requiredRole: p.requiredRole,
                };
            }),
        };
    }
    async findOne(userId) {
        const userResult = await this.userDataMapper.findOne({
            where: {
                id: userId,
            },
        });
        const [coverImageResult, permissionResult] = await Promise.all([
            this.imageDataMapper.findOne({
                where: {
                    id: userResult.coverImageId,
                },
            }),
            this.permissionDataMapper.find({
                where: {
                    id: (0, typeorm_1.In)(userResult.permissionIds),
                },
            }),
        ]);
        return {
            id: userResult.name,
            name: userResult.name,
            coverImage: {
                id: coverImageResult.id,
                url: `https://hahow.in/images/${coverImageResult.id}`,
            },
            role: userResult.role,
            permissions: permissionResult.map((p) => {
                return {
                    id: p.id,
                    rule: p.rule,
                    requiredRole: p.requiredRole,
                };
            }),
            createdAt: userResult.createdAt,
            updatedAt: userResult.updatedAt,
        };
    }
};
UserRepository = UserRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map