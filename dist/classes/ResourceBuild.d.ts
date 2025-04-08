import { LktObject } from 'lkt-ts-interfaces';
import { ResourceMethod } from '../enums/ResourceMethod';
import { StatusValidator } from '../types/StatusValidator';
import { UserAuth } from '../types/UserAuth';
export declare class ResourceBuild {
    readonly url: string;
    readonly method: ResourceMethod;
    readonly data: LktObject;
    readonly auth: UserAuth;
    readonly statusValidator: StatusValidator;
    readonly headers: LktObject;
    constructor(url: string, method: ResourceMethod, data: LktObject, auth: UserAuth, statusValidator: StatusValidator, headers: LktObject);
}
