import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PubSubModule } from './pubsub/pubsub.module';

/**
 * Global Module 裡的 feature Module
 * 代表所有的 Module 都可以使用，並且都帶有 @Global
 */
@Module({
  imports: [PubSubModule, DatabaseModule],
  exports: [PubSubModule, DatabaseModule],
})
export class GlobalModule {}
