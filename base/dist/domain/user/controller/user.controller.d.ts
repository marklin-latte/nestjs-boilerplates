import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { AdminUserUseCase } from '../usecase/admin-user.usecase';
import { AdminCreateUserOutputDto } from '../dto/admin-create-user-output.dto';
export declare class UserController {
    private readonly adminUserUseCase;
    constructor(adminUserUseCase: AdminUserUseCase);
    create(adminCreateUserInputDto: AdminCreateUserInputDto): Promise<AdminCreateUserOutputDto>;
}
