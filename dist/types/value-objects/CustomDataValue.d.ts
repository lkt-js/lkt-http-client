import { LktObject } from "lkt-ts-interfaces";
export declare class CustomDataValue {
    readonly value: LktObject;
    constructor(value?: LktObject);
    hasToDig(): boolean;
    dig(data: LktObject): LktObject;
}
