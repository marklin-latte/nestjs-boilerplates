"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWorkUtil = void 0;
const common_1 = require("@nestjs/common");
class UnitOfWorkUtil {
    logger = new common_1.Logger(UnitOfWorkUtil.name);
    transactionQueryRunner;
    dataSource;
    originRepositories = [];
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async start() {
        this.transactionQueryRunner = this.dataSource.createQueryRunner();
        this.originRepositories.forEach((repository) => {
            this.transactionQueryRunner.manager.withRepository(repository);
        });
        await this.transactionQueryRunner.startTransaction();
    }
    registerEntity(entity) {
        const result = this.dataSource.getRepository(entity);
        this.originRepositories.push(result);
        return result;
    }
    registerRepository(Class) {
        return new Class(this);
    }
    async complete() {
        try {
            await this.transactionQueryRunner.commitTransaction();
        }
        catch (error) {
            await this.transactionQueryRunner.rollbackTransaction();
            this.logger.error(error);
            throw error;
        }
        finally {
            this.originRepositories.forEach((repository) => {
                this.dataSource.manager.withRepository(repository);
            });
            await this.transactionQueryRunner.release();
        }
    }
}
exports.UnitOfWorkUtil = UnitOfWorkUtil;
//# sourceMappingURL=unit-of-work.util.js.map