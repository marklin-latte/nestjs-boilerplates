import { transports } from 'winston';
declare const _default: () => {
    format: import("logform").Format;
    transports: transports.FileTransportInstance[];
} | {
    format: import("logform").Format;
    transports: transports.ConsoleTransportInstance[];
};
export default _default;
