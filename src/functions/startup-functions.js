import {LktResource} from "../classes/LktResource";
import {LktEnvironment} from "../classes/LktEnvironment";
import {LktRouter} from "../classes/LktRouter";

/**
 *
 * @param name
 * @param path
 * @param method
 * @returns {LktResource}
 */
export const createHTTPResource = (name, path, method) => {
    let r = new LktResource(name, path, method);
    registerHTTPResource(r);
    return getHTTPResource(name);
}

/**
 *
 * @param name
 * @param url
 * @param auth
 * @returns {LktEnvironment}
 */
export const createHTTPEnvironment = (name, url, auth) => {
    let r = new LktEnvironment(name, url, auth);
    registerHTTPEnvironment(r);
    return getHTTPEnvironment(name);
}

/**
 *
 * @param resource
 */
export const registerHTTPResource = (resource) => {
    LktRouter.addResource(resource);
}

/**
 *
 * @param environment
 */
export const registerHTTPEnvironment = (environment) => {
    LktRouter.addEnvironment(environment);
}

/**
 *
 * @param resource
 * @returns {LktResource|undefined}
 */
export const getHTTPResource = (resource) => {
    return LktRouter.getResource(resource);
}

/**
 *
 * @param environment
 * @returns {LktEnvironment|undefined}
 */
export const getHTTPEnvironment = (environment) => {
    return LktRouter.getEnvironment(environment);
}