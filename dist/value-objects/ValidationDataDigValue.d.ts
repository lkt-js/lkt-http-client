import { LktObject } from "lkt-ts-interfaces";
export declare class ValidationDataDigValue {
    readonly value: string;
    constructor(value?: string);
    hasToDig(): boolean;
    dig(data: LktObject): LktObject;
}
