import {ResourceStack} from "../interfaces/ResourceStack";
import {LktResource} from "./LktResource";

export class ResourceManager {
    value: ResourceStack = {};
    
    add(resource: LktResource) {
        this.value[resource.name.value] = resource;
    }

    get(name: string) {
        if (this.value[name] instanceof LktResource) {
            return this.value[name];
        }
        return undefined;
    }

    exists (name: string): boolean  {
        return this.value[name] instanceof LktResource;
    }
}