import { LktResource } from "../classes/LktResource";
import { LktEnvironment } from "../classes/LktEnvironment";
import { IAuth } from "../interfaces/IAuth";
export declare const createHTTPGetResource: (name: string, path: string, env?: string) => LktResource;
export declare const createHTTPPostResource: (name: string, path: string, env?: string) => LktResource;
export declare const createHTTPPutResource: (name: string, path: string, env?: string) => LktResource;
export declare const createHTTPDeleteResource: (name: string, path: string, env?: string) => LktResource;
export declare const createHTTPOpenResource: (name: string, path: string, env?: string) => LktResource;
export declare const createHTTPDownloadResource: (name: string, path: string, env?: string) => LktResource;
/**
 *
 * @param name
 * @param path
 * @param method
 * @param env
 */
export declare const createHTTPResource: (name: string, path: string, method?: string, env?: string) => LktResource;
/**
 *
 * @param name
 * @param url
 * @param auth
 */
export declare const createHTTPEnvironment: (name: string, url: string, auth?: IAuth) => LktEnvironment;
/**
 *
 * @param resource
 */
export declare const getHTTPResource: (resource: string) => LktResource;
/**
 *
 * @param environment
 */
export declare const getHTTPEnvironment: (environment: string) => LktEnvironment;
