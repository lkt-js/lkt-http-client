import { LktObject } from 'lkt-ts-interfaces';
import { ResourceParamStack } from '../interfaces/ResourceParamStack';
import { ResourceDataType } from './ResourceDataType';
import { ResourceMethod } from './ResourceMethod';
import { StatusValidator } from './StatusValidator';
export declare type ResourceData = {
    url: string;
    name: string;
    method?: ResourceMethod;
    headers?: LktObject;
    dataType?: ResourceDataType;
    isFileUpload?: boolean;
    validStatuses?: number[];
    validateStatus?: StatusValidator;
    environment?: string;
    params?: ResourceParamStack;
    onSuccess?: Function;
};
