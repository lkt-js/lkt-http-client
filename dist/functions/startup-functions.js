import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { LktRouter } from "../classes/LktRouter";
export const createHTTPGetResource = (data) => {
    const mix = { ...data, method: 'get' };
    return createHTTPResource(mix);
};
export const createHTTPPostResource = (data) => {
    const mix = { ...data, method: 'post' };
    return createHTTPResource(mix);
};
export const createHTTPPutResource = (data) => {
    const mix = { ...data, method: 'put' };
    return createHTTPResource(mix);
};
export const createHTTPDeleteResource = (data) => {
    const mix = { ...data, method: 'delete' };
    return createHTTPResource(mix);
};
export const createHTTPOpenResource = (data) => {
    const mix = { ...data, method: 'open' };
    return createHTTPResource(mix);
};
export const createHTTPDownloadResource = (data) => {
    const mix = { ...data, method: 'download' };
    return createHTTPResource(mix);
};
/**
 *
 * @param data
 */
export const createHTTPResource = (data) => {
    const r = new LktResource(data);
    LktRouter.resources.add(r);
    return getHTTPResource(data.name);
};
/**
 *
 * @param data
 */
export const createHTTPEnvironment = (data) => {
    const r = new LktEnvironment(data.name, data.url, data.auth, data.params, data.headers);
    LktRouter.environments.add(r);
    return getHTTPEnvironment(data.name);
};
/**
 *
 * @param resource
 */
export const getHTTPResource = (resource) => {
    return LktRouter.resources.get(resource);
};
/**
 *
 * @param environment
 */
export const getHTTPEnvironment = (environment) => {
    return LktRouter.environments.get(environment);
};
