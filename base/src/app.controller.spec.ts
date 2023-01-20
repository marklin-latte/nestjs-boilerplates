import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Get /health', () => {
    it('should return OK', () => {
      expect(appController.getHealth()).toBe('OK');
    });
  });

  describe('Get /healthz', () => {
    it('should return OK', () => {
      expect(appController.getHealthz()).toBe('OK');
    });
  });
});
