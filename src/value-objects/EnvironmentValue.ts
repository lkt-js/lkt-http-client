import {getHTTPEnvironment} from "../functions/startup-functions";
import {UserAuth} from "../types/UserAuth";

export class EnvironmentValue {
    public readonly value: string;

    constructor(value?: string) {
        if (!value) {
            value = 'default';
        }
        this.value = value;
    }

    getUrl(): string {
        const env = getHTTPEnvironment(this.value);
        if (env) {
            return env.url.value;
        }
        return '';
    }

    getAuth(): UserAuth {
        const env = getHTTPEnvironment(this.value);

        if (env && env.auth) {
            return env.auth;
        }

        return {};
    }
}