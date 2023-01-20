import { OnModuleInit, Logger } from '@nestjs/common';
import { PubSubService, PublishMessage } from './pubsub.interface';
export { CloudPubSubConfig, GCPPubSubService };
declare type CloudPubSubConfig = {
    projectId: string;
    subscriptionName: string;
};
declare class GCPPubSubService implements PubSubService, OnModuleInit {
    logger: Logger;
    private readonly config;
    private pubsubService;
    private topicMap;
    onModuleInit(): Promise<void>;
    publish(topicName: string, message: PublishMessage): Promise<void>;
    private getTopic;
}
