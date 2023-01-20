import tracer from 'dd-trace';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { appConfig } from './config/application.config';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';

async function bootstrap() {
  // 在 app 開啟前，要先將資料庫的 public schema 建好。
  // 無法直接寫在 migration 裡，因為 app module 的 migration 那
  // 一定要指定 schema
  const connection: DataSource = new DataSource({
    ...appConfig.db,
    type: 'postgres',
  });
  await connection.initialize();
  await connection.query(`CREATE SCHEMA IF NOT EXISTS "public"`);
  await connection.destroy();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig()),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('The Example API description')
    .setVersion('1.0')
    .addTag('example')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  tracer.init();
  await app.listen(appConfig.port);
}
bootstrap();
