import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { EnvironmentData } from '../types/EnvironmentData';
import { ResourceData } from '../types/ResourceData';
export declare const createHTTPGetResource: (data: ResourceData) => LktResource;
export declare const createHTTPPostResource: (data: ResourceData) => LktResource;
export declare const createHTTPPutResource: (data: ResourceData) => LktResource;
export declare const createHTTPDeleteResource: (data: ResourceData) => LktResource;
export declare const createHTTPOpenResource: (data: ResourceData) => LktResource;
export declare const createHTTPDownloadResource: (data: ResourceData) => LktResource;
/**
 *
 * @param data
 */
export declare const createHTTPResource: (data: ResourceData) => LktResource;
/**
 *
 * @param data
 */
export declare const createHTTPEnvironment: (data: EnvironmentData) => LktEnvironment;
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
