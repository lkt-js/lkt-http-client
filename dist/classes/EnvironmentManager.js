import { LktEnvironment } from './LktEnvironment';
export class EnvironmentManager {
    constructor() {
        this.value = {};
    }
    add(environment) {
        this.value[environment.name.value] = environment;
    }
    get(name) {
        if (this.value[name] instanceof LktEnvironment) {
            return this.value[name];
        }
        return undefined;
    }
    exists(name) {
        return this.value[name] instanceof LktEnvironment;
    }
}
