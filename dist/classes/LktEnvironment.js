import { EnvironmentUrlValue } from '../value-objects/EnvironmentUrlValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
export class LktEnvironment {
    constructor(name, url, auth) {
        this.name = new ResourceNameValue(name);
        this.url = new EnvironmentUrlValue(url);
        this.auth = auth;
    }
}
