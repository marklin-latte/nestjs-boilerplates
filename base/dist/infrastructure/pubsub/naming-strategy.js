"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantNamingStrategy = void 0;
const application_config_1 = require("../../config/application.config");
function tenantNamingStrategy(tenantId) {
    return `projects/${application_config_1.appConfig.gcpPubsub.projectId}/topics/${application_config_1.appConfig.serviceName.toLowerCase()}_tenanted_${tenantId}`;
}
exports.tenantNamingStrategy = tenantNamingStrategy;
//# sourceMappingURL=naming-strategy.js.map