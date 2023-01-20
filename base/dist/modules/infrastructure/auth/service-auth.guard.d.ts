declare const ServiceAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class ServiceAuthGuard extends ServiceAuthGuard_base {
    handleRequest(err: any, serviceInfo: any, info: any): any;
}
export {};
