"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const unit_of_work_util_1 = require("../database/unit-of-work.util");
const database_provider_1 = require("./database.provider");
const application_config_1 = require("../../config/application.config");
const unitOfWorkFactory = {
    provide: database_provider_1.ProviderTokens.UNIT_OF_WORK,
    scope: common_1.Scope.REQUEST,
    useFactory: async (request) => {
        const { tenantId } = request;
        if (!tenantId)
            return null;
        const connection = new typeorm_1.DataSource(application_config_1.appConfig.db);
        connection.initialize();
        const unitOfWork = new unit_of_work_util_1.UnitOfWorkUtil(connection);
        return unitOfWork;
    },
    inject: [core_1.REQUEST],
};
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [unitOfWorkFactory],
        exports: [database_provider_1.ProviderTokens.UNIT_OF_WORK],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map