"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_commander_1 = require("nest-commander");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("../config/winston.config");
const commander_module_1 = require("./commander.module");
async function bootstrap() {
    await nest_commander_1.CommandFactory.run(commander_module_1.CommandModule, {
        logger: nest_winston_1.WinstonModule.createLogger((0, winston_config_1.default)()),
    });
}
bootstrap();
//# sourceMappingURL=index.js.map