import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, appConfig } from './config/application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { RouterModule } from 'nest-router';
import { routers } from './app.routes';
import { DomainModule } from './domain/domain.module';
import { GlobalModule } from './infrastructure/global.module';
import {
  PubSubModule,
  PubSubSupplement,
} from './infrastructure/pubsub/pubsub.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    RouterModule.forRoutes(routers),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('db.host'),
          port: config.get<number>('db.port'),
          username: config.get('db.username'),
          password: config.get('db.password'),
          database: config.get('db.database'),
          entities: [
            path.join(__dirname, '/modules/**/entity', '*.entity{.ts,.js}'),
          ],
        };
      },
      inject: [ConfigService],
    }),
    DomainModule,
    GlobalModule,
    PubSubModule.register({
      supplement: PubSubSupplement.GCPCloudPubSub,
      config: {
        projectId: appConfig.gcpPubsub.projectId,
        subscriptionName: appConfig.serviceName,
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: appConfig.serviceAuth.secret,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, JwtStrategy],
})
export class AppModule {}
