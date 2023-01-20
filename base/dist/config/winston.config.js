"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.default = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((info) => {
                return `[ ${info.timestamp} ] [ ${info.level} ] [ ${info.context} ] : ${JSON.stringify(info.message)}`;
            })),
            transports: [
                new winston_1.transports.File({
                    filename: `${process.cwd()}/logs/error.log`,
                    level: 'error',
                }),
                new winston_1.transports.File({
                    filename: `${process.cwd()}/logs/info.log`,
                    level: 'info',
                    tailable: true,
                }),
            ],
        };
    }
    return {
        format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.printf((info) => {
            return `[ ${info.timestamp} ] [ ${info.level} ] [ ${info.context} ] : ${JSON.stringify(info.message)}`;
        })),
        transports: [new winston_1.transports.Console()],
    };
};
//# sourceMappingURL=winston.config.js.map