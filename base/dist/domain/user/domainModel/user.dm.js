"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.Permission = exports.User = void 0;
const common_1 = require("@nestjs/common");
class User {
    id;
    name;
    coverImage;
    role;
    permissions;
    updatedAt;
    createdAt;
    addPermission(permission) {
        if (permission.requiredRole !== this.role) {
            throw new common_1.BadRequestException('the role is not qualified');
        }
        this.permissions.push(permission);
    }
}
exports.User = User;
class Permission {
    id;
    rule;
    requiredRole;
}
exports.Permission = Permission;
class Image {
    id;
    url;
}
exports.Image = Image;
//# sourceMappingURL=user.dm.js.map