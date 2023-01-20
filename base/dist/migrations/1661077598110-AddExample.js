"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExample1638963391898 = void 0;
const typeorm_1 = require("typeorm");
const nameStrategy = new typeorm_1.DefaultNamingStrategy();
class AddExample1638963391898 {
    async up(queryRunner) {
        const tenantTable = new typeorm_1.Table({
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    length: '255',
                    name: 'name',
                    type: 'varchar',
                },
                {
                    default: 'now()',
                    name: 'createdAt',
                    type: 'timestamp with time zone',
                },
                {
                    default: 'now()',
                    name: 'updatedAt',
                    type: 'timestamp with time zone',
                },
            ],
            name: nameStrategy.tableName('Example', undefined),
        });
        await queryRunner.createTable(tenantTable);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(nameStrategy.tableName('Example', undefined));
    }
}
exports.AddExample1638963391898 = AddExample1638963391898;
//# sourceMappingURL=1661077598110-AddExample.js.map