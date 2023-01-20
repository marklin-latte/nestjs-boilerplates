import { DynamicModule } from '@nestjs/common';
import { CloudPubSubConfig } from './supplement/gcp-pubsub.service';
export declare enum PubSubSupplement {
    'GCPCloudPubSub' = "GCPCloudPubSub"
}
declare type PubSubConfig = {
    supplement: PubSubSupplement;
    config: CloudPubSubConfig;
};
export declare class PubSubModule {
    static register(pubsubConfig: PubSubConfig): DynamicModule;
}
export {};
