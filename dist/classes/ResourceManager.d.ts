import { ResourceStack } from "../interfaces/ResourceStack";
import { LktResource } from "./LktResource";
export declare class ResourceManager {
    value: ResourceStack;
    add(resource: LktResource): void;
    get(name: string): LktResource | undefined;
    exists(name: string): boolean;
}
