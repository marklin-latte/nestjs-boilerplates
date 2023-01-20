import { PubSub, Topic } from '@google-cloud/pubsub';
import {
  BadRequestException,
  Inject,
  OnModuleInit,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ProviderTokens } from '../pubsub.provider';
import { PubSubService, PublishMessage } from './pubsub.interface';

export { CloudPubSubConfig, GCPPubSubService };

type CloudPubSubConfig = {
  projectId: string;
  subscriptionName: string;
};

@Injectable()
class GCPPubSubService implements PubSubService, OnModuleInit {
  logger: Logger = new Logger(GCPPubSubService.name);

  @Inject(ProviderTokens.PUBSUB_CONFIG)
  private readonly config: CloudPubSubConfig;

  private pubsubService: PubSub;
  private topicMap: Map<string, Topic>;

  async onModuleInit(): Promise<void> {
    this.pubsubService = new PubSub({
      projectId: this.config.projectId,
    });
    this.topicMap = new Map();
  }

  async publish(topicName: string, message: PublishMessage): Promise<void> {
    const topic = await this.getTopic(topicName);

    if (!topic) {
      throw new BadRequestException(`The topic:${topicName} was nonexistent`);
    }

    this.logger.log(`${topicName} be going to publish`);
    await topic.publishMessage({ json: message });
  }

  private async getTopic(topicName): Promise<Topic> {
    this.logger.log(`get ${topicName} topic`);
    if (this.topicMap.has(topicName)) return this.topicMap.get(topicName);

    const topic: Topic = this.pubsubService.topic(topicName);
    const topicResponse = (await topic.exists())[0]
      ? await topic.get()
      : await topic.create();

    this.logger.log(`${topicName} is exist`);
    const result: Topic = topicResponse[0];

    this.topicMap.set(topicName, result);

    return result;
  }
}
