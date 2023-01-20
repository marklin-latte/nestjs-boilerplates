import { PubSubService } from '../../infrastructure/pubsub/supplement/pubsub.interface';
import { Logger } from '@nestjs/common';
import { TransactionUnitOfWork } from '../../infrastructure/database/unit-of-work.interface';
import { appConfig } from '../../config/application.config';

export class BaseUseCase {
  logger = new Logger(BaseUseCase.name);
  // 本來想用 inject 的方式注入，但不知道為什麼一直注入失敗
  // 因此先透過 child class 進來注入
  protected readonly unitOfWork: TransactionUnitOfWork;
  private readonly pubsubService: PubSubService;

  constructor(unitOfWork: TransactionUnitOfWork, pubsubService: PubSubService) {
    this.unitOfWork = unitOfWork;
    this.pubsubService = pubsubService;
  }

  async publishDomainEvent(domainEvent: string, message: any) {
    const topicName = `projects/${
      appConfig.gcpPubsub.projectId
    }/topics/${appConfig.serviceName.toLowerCase()}`;
    await this.pubsubService.publish(topicName, {
      event: domainEvent,
      message,
    });
    this.logger.log(
      `DomainEvent:${domainEvent} has sent to topic;${topicName}`,
    );
  }
}
