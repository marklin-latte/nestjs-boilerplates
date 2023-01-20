"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PubSubModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubModule = exports.PubSubSupplement = void 0;
const common_1 = require("@nestjs/common");
const pubsub_provider_1 = require("./pubsub.provider");
const gcp_pubsub_service_1 = require("./supplement/gcp-pubsub.service");
var PubSubSupplement;
(function (PubSubSupplement) {
    PubSubSupplement["GCPCloudPubSub"] = "GCPCloudPubSub";
})(PubSubSupplement = exports.PubSubSupplement || (exports.PubSubSupplement = {}));
const SupplementPubSubServiceFactory = {
    [PubSubSupplement.GCPCloudPubSub]: gcp_pubsub_service_1.GCPPubSubService,
};
let PubSubModule = PubSubModule_1 = class PubSubModule {
    static register(pubsubConfig) {
        return {
            module: PubSubModule_1,
            providers: [
                {
                    provide: pubsub_provider_1.ProviderTokens.PUBSUB_CONFIG,
                    useValue: pubsubConfig.config,
                },
                {
                    provide: pubsub_provider_1.ProviderTokens.PUBSUB_SERVICE,
                    useClass: SupplementPubSubServiceFactory[pubsubConfig.supplement],
                },
            ],
            exports: [pubsub_provider_1.ProviderTokens.PUBSUB_SERVICE, pubsub_provider_1.ProviderTokens.PUBSUB_CONFIG],
        };
    }
};
PubSubModule = PubSubModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PubSubModule);
exports.PubSubModule = PubSubModule;
//# sourceMappingURL=pubsub.module.js.map