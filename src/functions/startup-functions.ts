import {LktResource} from "../classes/LktResource";
import {LktEnvironment} from "../classes/LktEnvironment";
import {LktRouter} from "../classes/LktRouter";
import {IAuth} from "../interfaces/IAuth";
import {METHOD_DELETE, METHOD_DOWNLOAD, METHOD_GET, METHOD_OPEN, METHOD_POST, METHOD_PUT} from "../constants";

export const createHTTPGetResource = (name: string, path: string, env: string = 'default') => {
    return createHTTPResource(name, path, METHOD_GET, env);
}

export const createHTTPPostResource = (name: string, path: string, env: string = 'default') => {
    return createHTTPResource(name, path, METHOD_POST, env);
}

export const createHTTPPutResource = (name: string, path: string, env: string = 'default') => {
    return createHTTPResource(name, path, METHOD_PUT, env);
}

export const createHTTPDeleteResource = (name: string, path: string, env: string = 'default') => {
    return createHTTPResource(name, path, METHOD_DELETE, env);
}

export const createHTTPOpenResource = (name: string, path: string, env: string = 'default') => {
    return createHTTPResource(name, path, METHOD_OPEN, env);
}

export const createHTTPDownloadResource = (name: string, path: string, env: string = 'default') => {
    return createHTTPResource(name, path, METHOD_DOWNLOAD, env);
}

/**
 *
 * @param name
 * @param path
 * @param method
 * @param env
 */
export const createHTTPResource = (name: string, path: string, method: string = 'get', env: string = 'default'): LktResource => {
    let r = new LktResource(name, path, method).setEnvironment(env);
    LktRouter.addResource(r);
    return getHTTPResource(name);
}

/**
 *
 * @param name
 * @param url
 * @param auth
 */
export const createHTTPEnvironment = (name: string, url: string, auth: IAuth = {}): LktEnvironment => {
    let r = new LktEnvironment(name, url, auth);
    LktRouter.addEnvironment(r);
    return getHTTPEnvironment(name);
}

/**
 *
 * @param resource
 */
export const getHTTPResource = (resource: string) => {
    return LktRouter.getResource(resource);
}

/**
 *
 * @param environment
 */
export const getHTTPEnvironment = (environment: string) => {
    return LktRouter.getEnvironment(environment);
}