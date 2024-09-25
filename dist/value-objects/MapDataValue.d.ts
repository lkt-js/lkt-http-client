import { LktObject } from "lkt-ts-interfaces";
export declare class MapDataValue {
    private readonly value?;
    constructor(value?: any);
    hasActionDefined(): boolean;
    run(data: LktObject, props: LktObject): any;
}
