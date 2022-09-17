import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { LktRouter } from '../classes/LktRouter';
import {EnvironmentData} from "../types/EnvironmentData";
// import {
//   METHOD_DELETE,
//   METHOD_DOWNLOAD,
//   METHOD_GET,
//   METHOD_OPEN,
//   METHOD_POST,
//   METHOD_PUT,
// } from '../constants';
import {ResourceData} from "../types/ResourceData";
import { UserAuth } from '../types/UserAuth';

// export const createHTTPGetResource = (
//   name: string,
//   path: string,
//   env: string = 'default'
// ) => {
//   return createHTTPResource(name, path, METHOD_GET, env);
// };
//
// export const createHTTPPostResource = (name: string, path: string, env: string = 'default') => {
//     return createHTTPResource(name, path, METHOD_POST, env);
// }
//
// export const createHTTPPutResource = (name: string, path: string, env: string = 'default') => {
//     return createHTTPResource(name, path, METHOD_PUT, env);
// }
//
// export const createHTTPDeleteResource = (name: string, path: string, env: string = 'default') => {
//     return createHTTPResource(name, path, METHOD_DELETE, env);
// }
//
// export const createHTTPOpenResource = (name: string, path: string, env: string = 'default') => {
//     return createHTTPResource(name, path, METHOD_OPEN, env);
// }
//
// export const createHTTPDownloadResource = (name: string, path: string, env: string = 'default') => {
//     return createHTTPResource(name, path, METHOD_DOWNLOAD, env);
// }

/**
 *
 * @param data
 */
export const createHTTPResource = (data: ResourceData): LktResource => {
    const r = new LktResource(data);
    LktRouter.addResource(r);
    return getHTTPResource(data.name);
}

/**
 *
 * @param data
 */
export const createHTTPEnvironment = (data: EnvironmentData): LktEnvironment => {
    const r = new LktEnvironment(data.name, data.url, data.auth);
    LktRouter.addEnvironment(r);
    return getHTTPEnvironment(data.name);
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