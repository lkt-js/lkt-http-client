import { EnvironmentUrlValue } from '../value-objects/EnvironmentUrlValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
import { ResourceParamsValue } from "../value-objects/ResourceParamsValue";
export class LktEnvironment {
    constructor(name, url, auth, params, headers) {
        this.name = new ResourceNameValue(name);
        this.url = new EnvironmentUrlValue(url);
        this.params = new ResourceParamsValue(params);
        this.headers = typeof headers === 'undefined' ? {} : headers;
        this.auth = auth;
    }
    getParams() {
        return JSON.parse(JSON.stringify(this.params.value));
    }
}
