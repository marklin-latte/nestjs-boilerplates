export declare const appConfig: {
    serviceName: string;
    port: number;
    serviceAuth: {
        secret: string;
        allowedServices: string[];
    };
    db: {
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    };
    gcpPubsub: {
        projectId: string;
    };
};
export declare function configuration(): {
    serviceName: string;
    port: number;
    serviceAuth: {
        secret: string;
        allowedServices: string[];
    };
    db: {
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    };
    gcpPubsub: {
        projectId: string;
    };
};
