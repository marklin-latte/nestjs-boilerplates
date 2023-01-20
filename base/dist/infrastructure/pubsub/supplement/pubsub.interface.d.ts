export declare type PublishMessage = {
    event: string;
    message: object;
};
export interface PubSubService {
    publish(topic: string, message: PublishMessage): Promise<any>;
}
