import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { EnvironmentData } from '../types/EnvironmentData';
import { ResourceData } from '../types/ResourceData';
export declare const createHTTPGetResource: (data: ResourceData) => LktResource | undefined;
export declare const createHTTPPostResource: (data: ResourceData) => LktResource | undefined;
export declare const createHTTPPutResource: (data: ResourceData) => LktResource | undefined;
export declare const createHTTPDeleteResource: (data: ResourceData) => LktResource | undefined;
export declare const createHTTPOpenResource: (data: ResourceData) => LktResource | undefined;
export declare const createHTTPDownloadResource: (data: ResourceData) => LktResource | undefined;
/**
 *
 * @param data
 */
export declare const createHTTPResource: (data: ResourceData) => LktResource | undefined;
/**
 *
 * @param data
 */
export declare const createHTTPEnvironment: (data: EnvironmentData) => LktEnvironment | undefined;
/**
 *
 * @param resource
 */
export declare const getHTTPResource: (resource: string) => LktResource | undefined;
/**
 *
 * @param environment
 */
export declare const getHTTPEnvironment: (environment: string) => LktEnvironment | undefined;
