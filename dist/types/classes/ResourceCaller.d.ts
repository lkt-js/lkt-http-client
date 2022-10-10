import { LktObject } from "lkt-ts-interfaces";
import { ResourceCallerConfig } from '../types/ResourceCallerConfig';
import { ResourceAliasValue } from '../value-objects/ResourceAliasValue';
import { ResourceCallDataValue } from '../value-objects/ResourceCallDataValue';
export declare class ResourceCaller {
    resource: ResourceAliasValue;
    params?: ResourceCallDataValue;
    constructor(config: ResourceCallerConfig);
    isCallable(): boolean;
    setParam(key: string, value: any): void;
    setParams(params: LktObject): void;
    call(): Promise<any>;
}
