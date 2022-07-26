import {LktResource} from "./LktResource";
import {LktEnvironment} from "./LktEnvironment";
import {isObject, isUndefined} from "lkt-tools";
import {IResourceStack} from "../interfaces/IResourceStack";
import {IEnvironmentStack} from "../interfaces/IEnvironmentStack";

export class LktRouter {

    static RESOURCES: IResourceStack = {};
    static ENVIRONMENTS: IEnvironmentStack = {};
    static DEFAULT_ENVIRONMENT: string = undefined;

    /**
     *
     * @param resource
     */
    static addResource(resource: LktResource) {
        LktRouter.RESOURCES[resource.name] = resource;
    }

    /**
     *
     * @param environment
     * @returns {LktRouter}
     */
    static addEnvironment(environment: LktEnvironment) {
        if (isUndefined(LktRouter.DEFAULT_ENVIRONMENT)) {
            LktRouter.DEFAULT_ENVIRONMENT = environment.name;
        }
        LktRouter.ENVIRONMENTS[environment.name] = environment;
    }

    /**
     *
     * @param name
     */
    static getResource(name: string) {
        if (isObject(LktRouter.RESOURCES[name])) {
            return LktRouter.RESOURCES[name];
        }
        return undefined;
    }

    /**
     *
     * @param name
     */
    static getEnvironment(name: string) {
        if (isObject(LktRouter.ENVIRONMENTS[name])) {
            return LktRouter.ENVIRONMENTS[name];
        }
        return undefined;
    }
}