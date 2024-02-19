import { LktResource } from "./LktResource";
export class ResourceManager {
    constructor() {
        this.value = {};
    }
    add(resource) {
        this.value[resource.name.value] = resource;
    }
    get(name) {
        if (this.value[name] instanceof LktResource) {
            return this.value[name];
        }
        return undefined;
    }
    exists(name) {
        return this.value[name] instanceof LktResource;
    }
}
