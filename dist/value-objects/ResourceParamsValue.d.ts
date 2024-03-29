import { LktObject } from 'lkt-ts-interfaces';
import { ResourceParamStack } from '../interfaces/ResourceParamStack';
export declare class ResourceParamsValue {
    readonly value: ResourceParamStack;
    constructor(value?: ResourceParamStack);
    prepareValues(values?: LktObject, asFormData?: boolean, envParams?: LktObject): LktObject;
    replaceUrlValues(url: string, values?: LktObject): any;
}
