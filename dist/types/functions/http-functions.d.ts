import { ILktObject } from "lkt-tools";
import { LktResource } from "../classes/LktResource";
import { IResourceBuild } from "../interfaces/IResourceBuild";
/**
 *
 * @param status
 * @param validStatuses
 * @returns {boolean}
 */
export declare const getDefaultValidateStatus: (status: number, validStatuses?: number[]) => boolean;
/**
 *
 * @param resource
 * @param args
 * @returns {{headers: undefined, method: string, data: *, auth: {}, validateStatus: (function(*): boolean), url: string}}
 */
export declare const buildResource: (resource: LktResource, args: ILktObject) => IResourceBuild;
/**
 *
 * @param resource
 * @param params
 * @returns {Promise<unknown>|Promise<Result>|Promise<any>|Promise|Promise<AxiosResponse<any>>}
 */
export declare const callHTTPResource: (resource: LktResource, params?: ILktObject) => Promise<any>;
