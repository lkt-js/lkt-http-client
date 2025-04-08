import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { LktRouter } from '../classes/LktRouter';
import { ResourceMethod } from '../enums/ResourceMethod';
export const createHTTPGetResource = (data) => {
    const mix = { ...data, method: ResourceMethod.Get };
    return createHTTPResource(mix);
};
export const createHTTPPostResource = (data) => {
    const mix = { ...data, method: ResourceMethod.Post };
    return createHTTPResource(mix);
};
export const createHTTPPutResource = (data) => {
    const mix = { ...data, method: ResourceMethod.Put };
    return createHTTPResource(mix);
};
export const createHTTPDeleteResource = (data) => {
    const mix = { ...data, method: ResourceMethod.Delete };
    return createHTTPResource(mix);
};
export const createHTTPOpenResource = (data) => {
    const mix = { ...data, method: ResourceMethod.Open };
    return createHTTPResource(mix);
};
export const createHTTPDownloadResource = (data) => {
    const mix = { ...data, method: ResourceMethod.Download };
    return createHTTPResource(mix);
};
/**
 *
 * @param data
 */
export const createHTTPResource = (data) => {
    const r = new LktResource(data);
    LktRouter.addResource(r);
    return getHTTPResource(data.name);
};
/**
 *
 * @param data
 */
export const createHTTPEnvironment = (data) => {
    const r = new LktEnvironment(data.name, data.url, data.auth, data.params, data.headers);
    LktRouter.addEnvironment(r);
    return getHTTPEnvironment(data.name);
};
/**
 *
 * @param resource
 */
export const getHTTPResource = (resource) => {
    return LktRouter.getResource(resource);
};
/**
 *
 * @param environment
 */
export const getHTTPEnvironment = (environment) => {
    return LktRouter.getEnvironment(environment);
};
