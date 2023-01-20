"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = exports.appConfig = void 0;
const config = {
    serviceName: 'example-server',
    port: 6000,
    serviceAuth: {
        secret: process.env.SERVICE_AUTH_SECRET || 'test',
        allowedServices: ['hh-backend'],
    },
    db: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        database: process.env.DATABASE_NAME || 'hahow',
        username: process.env.DATABASE_USERNAME || 'hahow',
        password: process.env.DATABASE_PASSWORD || '12345',
    },
    gcpPubsub: {
        projectId: process.env.PUBSUB_GCP_PROJECT_ID || 'core-363709',
    },
};
exports.appConfig = config;
function configuration() {
    return config;
}
exports.configuration = configuration;
//# sourceMappingURL=application.config.js.map