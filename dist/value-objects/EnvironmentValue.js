import { getHTTPEnvironment } from "../functions/startup-functions";
export class EnvironmentValue {
    constructor(value) {
        if (!value) {
            value = 'default';
        }
        this.value = value;
    }
    getUrl() {
        const env = getHTTPEnvironment(this.value);
        if (env) {
            return env.url.value;
        }
        return '';
    }
    getAuth() {
        const env = getHTTPEnvironment(this.value);
        if (env && env.auth) {
            return env.auth;
        }
        return {};
    }
}
