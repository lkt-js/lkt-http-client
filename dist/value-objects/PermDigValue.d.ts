import { LktObject } from "lkt-ts-interfaces";
export declare class PermDigValue {
    readonly value: string;
    constructor(value?: string);
    hasToDig(): boolean;
    dig(data: LktObject): string[];
}
