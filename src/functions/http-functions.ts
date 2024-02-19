import {LktObject} from 'lkt-ts-interfaces';

import {getHTTPResource} from './startup-functions';
import {HTTPResponse} from "../types/HTTPResponse";
import {AxiosError, AxiosResponse} from "axios";

export const httpCall = async (resourceName: string = '', params: LktObject = {}) => {
    const resource = getHTTPResource(resourceName);
    if (typeof resource !== 'undefined') {
        return await resource.call(params);
    }
    let r: HTTPResponse = {
        data: {},
        maxPage: -1,
        perms: [],
        modifications: {},
        response: undefined,
        success: false,
        httpStatus: -1,
        autoReloadId: -1,
        custom: {}
    };
    return r;
};