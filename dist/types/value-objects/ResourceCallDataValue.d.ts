import { ResourceParamStack } from '../interfaces/ResourceParamStack';
export declare class ResourceCallDataValue {
    readonly value: ResourceParamStack;
    constructor(value?: ResourceParamStack);
    getParams(): ResourceParamStack;
}
