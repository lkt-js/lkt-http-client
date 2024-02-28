import { UserAuth } from '../types/UserAuth';
import { EnvironmentUrlValue } from '../value-objects/EnvironmentUrlValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
import { ResourceParamsValue } from "../value-objects/ResourceParamsValue";
import { ResourceParamStack } from "../interfaces/ResourceParamStack";
import { LktObject } from "lkt-ts-interfaces";
export declare class LktEnvironment {
    name: ResourceNameValue;
    url: EnvironmentUrlValue;
    params: ResourceParamsValue;
    headers: LktObject;
    auth?: UserAuth;
    constructor(name: string, url: string, auth?: UserAuth, params?: ResourceParamStack, headers?: LktObject);
    getParams(): any;
}
