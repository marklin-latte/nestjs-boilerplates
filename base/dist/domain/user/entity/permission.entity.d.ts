import { ROLE } from '../../../constants/user.constant';
export declare class Permission {
    id: string;
    rule: string;
    requiredRole: ROLE;
    createdAt: Date;
    updatedAt: Date;
}
