import { CommandFactory } from 'nest-commander';
import { WinstonModule } from 'nest-winston';
import winstonConfig from '../config/winston.config';
import { CommandModule } from './commander.module';

async function bootstrap() {
  await CommandFactory.run(CommandModule, {
    logger: WinstonModule.createLogger(winstonConfig()),
  });
}

bootstrap();
