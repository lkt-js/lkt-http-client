import { getHTTPResource } from './startup-functions';
export const httpCall = async (resourceName = '', params = {}) => {
    const resource = typeof resourceName === 'object' ? resourceName : getHTTPResource(resourceName);
    if (typeof resource !== 'undefined') {
        return await resource.call(params);
    }
    let r = {
        data: {},
        maxPage: -1,
        perms: [],
        modifications: {},
        response: undefined,
        success: false,
        httpStatus: -1,
        autoReloadId: -1,
        custom: {},
        contentType: ''
    };
    return r;
};
