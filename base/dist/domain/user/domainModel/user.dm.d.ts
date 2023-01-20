import { ROLE } from '../../../constants/user.constant';
export declare class User {
    id: string;
    name: string;
    coverImage: Image;
    role: ROLE;
    permissions: Permission[];
    updatedAt: Date;
    createdAt: Date;
    addPermission(permission: Permission): void;
}
export declare class Permission {
    id: string;
    rule: string;
    requiredRole: ROLE;
}
export declare class Image {
    id: string;
    url: string;
}
