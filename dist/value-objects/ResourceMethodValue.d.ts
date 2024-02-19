import { ResourceMethod } from "../types/ResourceMethod";
export declare class ResourceMethodValue {
    readonly value: ResourceMethod;
    constructor(value?: ResourceMethod);
    toPrimitive(): ResourceMethod;
    isGET(): boolean;
    isPOST(): boolean;
    isPUT(): boolean;
    isDELETE(): boolean;
    isOPEN(): boolean;
    isDOWNLOAD(): boolean;
    hasUrlParams(): boolean;
}
