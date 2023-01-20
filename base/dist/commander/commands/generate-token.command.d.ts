import { CommandRunner } from 'nest-commander';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
export declare class GenerateJWTTokenCommand extends CommandRunner {
    private jwtService;
    logger: Logger;
    constructor(jwtService: JwtService);
    run(inputs: string[]): Promise<void>;
}
