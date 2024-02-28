import { UserAuth } from "../types/UserAuth";
export declare class EnvironmentValue {
    readonly value: string;
    constructor(value?: string);
    getUrl(): string;
    getAuth(): UserAuth;
    getParams(): UserAuth;
    getHeaders(): UserAuth;
}
