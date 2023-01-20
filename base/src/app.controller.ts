import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Get('/healthz')
  getHealthz(): string {
    return 'OK';
  }
}