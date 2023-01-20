import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '../config/application.config';
import { GenerateJWTTokenCommand } from './commands/generate-token.command';

@Module({
  imports: [
    JwtModule.register({
      secret: appConfig.serviceAuth.secret,
    }),
  ],
  providers: [GenerateJWTTokenCommand],
})
export class CommandModule {}
