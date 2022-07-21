import {LktResource} from "./LktResource";
import {LktEnvironment} from "./LktEnvironment";
import {isObject, isUndefined} from "lkt-tools";

export class LktRouter {

    static RESOURCES = [];
    static ENVIRONMENTS = [];
    static DEFAULT_ENVIRONMENT = undefined;

    /**
     *
     * @param resource
     */
    static addResource(resource) {
        LktRouter.RESOURCES[resource.name] = resource;
    }

    /**
     *
     * @param environment
     * @returns {LktRouter}
     */
    static addEnvironment(environment) {
        if (isUndefined(LktRouter.DEFAULT_ENVIRONMENT)) {
            LktRouter.DEFAULT_ENVIRONMENT = environment.name;
        }
        LktRouter.ENVIRONMENTS[environment.name] = environment;
    }

    /**
     *
     * @param name
     * @returns {undefined|LktResource}
     */
    static getResource(name) {
        if (isObject(LktRouter.RESOURCES[name])) {
            return LktRouter.RESOURCES[name];
        }
        return undefined;
    }

    /**
     *
     * @param name
     * @returns {undefined|LktEnvironment}
     */
    static getEnvironment(name) {
        if (isObject(LktRouter.ENVIRONMENTS[name])) {
            return LktRouter.ENVIRONMENTS[name];
        }
        return undefined;
    }
}