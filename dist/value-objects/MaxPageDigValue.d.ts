import { LktObject } from "lkt-ts-interfaces";
export declare class MaxPageDigValue {
    readonly value: string;
    constructor(value?: string);
    hasToDig(): boolean;
    dig(data: LktObject): number;
}
