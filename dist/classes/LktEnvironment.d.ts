import { UserAuth } from '../types/UserAuth';
import { EnvironmentUrlValue } from '../value-objects/EnvironmentUrlValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
export declare class LktEnvironment {
    name: ResourceNameValue;
    url: EnvironmentUrlValue;
    auth?: UserAuth;
    constructor(name: string, url: string, auth?: UserAuth);
}
