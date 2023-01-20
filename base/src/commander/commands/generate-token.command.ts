/* eslint-disable no-console */

import { Command, CommandRunner } from 'nest-commander';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Command({
  name: 'generate-service-token',
  arguments: '<serviceName>',
  description: 'Generate jwt token for service',
})
export class GenerateJWTTokenCommand extends CommandRunner {
  logger: Logger = new Logger(GenerateJWTTokenCommand.name);

  constructor(private jwtService: JwtService) {
    super();
  }

  async run(inputs: string[]): Promise<void> {
    const serviceName = inputs[0];
    const payload = { service: serviceName, createdAt: Date.now() };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Generate the service#${serviceName} token`);
    console.log(token);
  }
}
