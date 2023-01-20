"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GCPPubSubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCPPubSubService = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const common_1 = require("@nestjs/common");
const pubsub_provider_1 = require("../pubsub.provider");
let GCPPubSubService = GCPPubSubService_1 = class GCPPubSubService {
    logger = new common_1.Logger(GCPPubSubService_1.name);
    config;
    pubsubService;
    topicMap;
    async onModuleInit() {
        this.pubsubService = new pubsub_1.PubSub({
            projectId: this.config.projectId,
        });
        this.topicMap = new Map();
    }
    async publish(topicName, message) {
        const topic = await this.getTopic(topicName);
        if (!topic) {
            throw new common_1.BadRequestException(`The topic:${topicName} was nonexistent`);
        }
        this.logger.log(`${topicName} be going to publish`);
        await topic.publishMessage({ json: message });
    }
    async getTopic(topicName) {
        this.logger.log(`get ${topicName} topic`);
        if (this.topicMap.has(topicName))
            return this.topicMap.get(topicName);
        const topic = this.pubsubService.topic(topicName);
        const topicResponse = (await topic.exists())[0]
            ? await topic.get()
            : await topic.create();
        this.logger.log(`${topicName} is exist`);
        const result = topicResponse[0];
        this.topicMap.set(topicName, result);
        return result;
    }
};
__decorate([
    (0, common_1.Inject)(pubsub_provider_1.ProviderTokens.PUBSUB_CONFIG),
    __metadata("design:type", Object)
], GCPPubSubService.prototype, "config", void 0);
GCPPubSubService = GCPPubSubService_1 = __decorate([
    (0, common_1.Injectable)()
], GCPPubSubService);
exports.GCPPubSubService = GCPPubSubService;
//# sourceMappingURL=gcp-pubsub.service.js.map