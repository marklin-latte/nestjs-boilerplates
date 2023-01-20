"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dd_trace_1 = require("dd-trace");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const application_config_1 = require("./config/application.config");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./config/winston.config");
async function bootstrap() {
    const connection = new typeorm_1.DataSource({
        ...application_config_1.appConfig.db,
        type: 'postgres',
    });
    await connection.initialize();
    await connection.query(`CREATE SCHEMA IF NOT EXISTS "public"`);
    await connection.destroy();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger((0, winston_config_1.default)()),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Example')
        .setDescription('The Example API description')
        .setVersion('1.0')
        .addTag('example')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    dd_trace_1.default.init();
    await app.listen(application_config_1.appConfig.port);
}
bootstrap();
//# sourceMappingURL=main.js.map