import { LktObject } from 'lkt-ts-interfaces';
import { ResourceParamStack } from '../interfaces/ResourceParamStack';
export declare class ResourceParamsValue {
    readonly value: ResourceParamStack;
    constructor(value?: ResourceParamStack);
    private getDefaultValues;
    prepareValues(values?: LktObject, asFormData?: boolean): LktObject;
}
