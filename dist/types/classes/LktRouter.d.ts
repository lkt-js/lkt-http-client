import { LktResource } from "./LktResource";
import { LktEnvironment } from "./LktEnvironment";
import { IResourceStack } from "../interfaces/IResourceStack";
import { IEnvironmentStack } from "../interfaces/IEnvironmentStack";
export declare class LktRouter {
    static RESOURCES: IResourceStack;
    static ENVIRONMENTS: IEnvironmentStack;
    static DEFAULT_ENVIRONMENT: string;
    /**
     *
     * @param resource
     */
    static addResource(resource: LktResource): void;
    /**
     *
     * @param environment
     * @returns {LktRouter}
     */
    static addEnvironment(environment: LktEnvironment): void;
    /**
     *
     * @param name
     */
    static getResource(name: string): LktResource;
    /**
     *
     * @param name
     */
    static getEnvironment(name: string): LktEnvironment;
}
