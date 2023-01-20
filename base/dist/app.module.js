"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const application_config_1 = require("./config/application.config");
const typeorm_1 = require("@nestjs/typeorm");
const path = require("path");
const nest_router_1 = require("nest-router");
const app_routes_1 = require("./app.routes");
const domain_module_1 = require("./domain/domain.module");
const global_module_1 = require("./infrastructure/global.module");
const pubsub_module_1 = require("./infrastructure/pubsub/pubsub.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./infrastructure/auth/jwt.strategy");
const passport_1 = require("@nestjs/passport");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_router_1.RouterModule.forRoutes(app_routes_1.routers),
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.cwd()}/src/config/.env.${process.env.NODE_ENV}`,
                load: [application_config_1.configuration],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => {
                    return {
                        type: 'postgres',
                        host: config.get('db.host'),
                        port: config.get('db.port'),
                        username: config.get('db.username'),
                        password: config.get('db.password'),
                        database: config.get('db.database'),
                        entities: [
                            path.join(__dirname, '/modules/**/entity', '*.entity{.ts,.js}'),
                        ],
                    };
                },
                inject: [config_1.ConfigService],
            }),
            domain_module_1.DomainModule,
            global_module_1.GlobalModule,
            pubsub_module_1.PubSubModule.register({
                supplement: pubsub_module_1.PubSubSupplement.GCPCloudPubSub,
                config: {
                    projectId: application_config_1.appConfig.gcpPubsub.projectId,
                    subscriptionName: application_config_1.appConfig.serviceName,
                },
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: application_config_1.appConfig.serviceAuth.secret,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, config_1.ConfigService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map