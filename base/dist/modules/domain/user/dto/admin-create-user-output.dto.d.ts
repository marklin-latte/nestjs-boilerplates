import { ROLE } from '../../../../constants/user.constant';
export declare class AdminCreateUserOutputDto {
    id: string;
    name: string;
    role: ROLE;
    createdAt: Date;
    updatedAt: Date;
}
