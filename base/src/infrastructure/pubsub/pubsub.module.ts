import { Module, DynamicModule, Global } from '@nestjs/common';
import { ProviderTokens } from './pubsub.provider';
import {
  CloudPubSubConfig,
  GCPPubSubService,
} from './supplement/gcp-pubsub.service';

export enum PubSubSupplement {
  'GCPCloudPubSub' = 'GCPCloudPubSub',
}

type PubSubConfig = {
  supplement: PubSubSupplement;
  config: CloudPubSubConfig;
};

const SupplementPubSubServiceFactory = {
  [PubSubSupplement.GCPCloudPubSub]: GCPPubSubService,
};

@Global()
@Module({})
export class PubSubModule {
  static register(pubsubConfig: PubSubConfig): DynamicModule {
    return {
      module: PubSubModule,
      providers: [
        {
          provide: ProviderTokens.PUBSUB_CONFIG,
          useValue: pubsubConfig.config,
        },
        {
          provide: ProviderTokens.PUBSUB_SERVICE,
          useClass: SupplementPubSubServiceFactory[pubsubConfig.supplement],
        },
      ],
      exports: [ProviderTokens.PUBSUB_SERVICE, ProviderTokens.PUBSUB_CONFIG],
    };
  }
}
