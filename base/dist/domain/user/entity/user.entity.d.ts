import { ROLE } from '../../../constants/user.constant';
export declare class User {
    id: string;
    name: string;
    role: ROLE;
    coverImageId: string;
    permissionIds: string[];
    createdAt: Date;
    updatedAt: Date;
}
