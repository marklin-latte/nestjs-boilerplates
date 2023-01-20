"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUseCase = void 0;
const common_1 = require("@nestjs/common");
const application_config_1 = require("../../config/application.config");
class BaseUseCase {
    logger = new common_1.Logger(BaseUseCase.name);
    unitOfWork;
    pubsubService;
    constructor(unitOfWork, pubsubService) {
        this.unitOfWork = unitOfWork;
        this.pubsubService = pubsubService;
    }
    async publishDomainEvent(domainEvent, message) {
        const topicName = `projects/${application_config_1.appConfig.gcpPubsub.projectId}/topics/${application_config_1.appConfig.serviceName.toLowerCase()}`;
        await this.pubsubService.publish(topicName, {
            event: domainEvent,
            message,
        });
        this.logger.log(`DomainEvent:${domainEvent} has sent to topic;${topicName}`);
    }
}
exports.BaseUseCase = BaseUseCase;
//# sourceMappingURL=base.usecase.js.map