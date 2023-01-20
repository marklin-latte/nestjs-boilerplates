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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateUserInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_constant_1 = require("../../../../constants/user.constant");
class AdminCreateUserInputDto {
    name;
    role;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User 名稱',
        example: 'example',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminCreateUserInputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User Role',
        example: `${user_constant_1.ROLE['STAFF']}`,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_constant_1.ROLE),
    __metadata("design:type", String)
], AdminCreateUserInputDto.prototype, "role", void 0);
exports.AdminCreateUserInputDto = AdminCreateUserInputDto;
//# sourceMappingURL=admin-create-user-input.dto.js.map