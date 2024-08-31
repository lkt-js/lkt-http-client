import { LktObject } from "lkt-ts-interfaces";
export declare class DigToRedirectValue {
    readonly value: string;
    constructor(value?: string);
    hasToDig(): boolean;
    dig(data: LktObject): string;
}
