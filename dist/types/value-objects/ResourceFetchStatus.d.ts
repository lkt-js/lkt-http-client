export declare class ResourceFetchStatus {
    private value;
    constructor(value?: boolean);
    inProgress(): boolean;
    start(): void;
    stop(): void;
}
