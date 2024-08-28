import {LktObject} from 'lkt-ts-interfaces';

import {getHTTPResource} from './startup-functions';
import {HTTPResponse} from "../types/HTTPResponse";
import {AxiosError, AxiosResponse} from "axios";
import {LktResource} from "../classes/LktResource";

export const httpCall = async (resourceName: string|LktResource = '', params: LktObject = {}) => {
    const resource = typeof resourceName === 'object' ? resourceName : getHTTPResource(resourceName);
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
        custom: {},
        contentType: '',
        validationCode: '',
        validationMessage: '',
        validationData: {},
    };
    return r;
};