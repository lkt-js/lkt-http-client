import {
    cloneObject,
    deleteObjectKeys,
    emptyPromise,
    extractFillData,
    fill, ILktObject,
    isFunction,
    isUndefined,
    time, trim
} from "lkt-tools";
import {SUCCESS_STATUSES} from "../constants";
import axios from "axios";
import {paramsToString, prepareHTTPResourceOptions} from "./helpers";
import {getHTTPEnvironment, getHTTPResource} from "./startup-functions";
import {Settings} from "../settings/Settings";
import {LktResource} from "../classes/LktResource";
import {IResourceBuild} from "../interfaces/IResourceBuild";
import {IMixinOptions} from "../interfaces/IMixinOptions";

/**
 *
 * @param status
 * @param validStatuses
 * @returns {boolean}
 */
export const getDefaultValidateStatus = (status: number, validStatuses: number[] = SUCCESS_STATUSES): boolean =>  {
    if (validStatuses.length === 0) {
        return true;
    }
    return validStatuses.indexOf(status) !== -1;
};

/**
 *
 * @param resource
 * @param args
 * @returns {{headers: undefined, method: string, data: *, auth: {}, validateStatus: (function(*): boolean), url: string}}
 */
export const buildResource = (resource: LktResource, args: ILktObject): IResourceBuild => {
    const p = cloneObject(resource.params);
    const method = resource.method.toLowerCase();
    let r: ILktObject = {};
    for (let k in p) {
        if (p.hasOwnProperty(k)) {
            r[k] = p[k].default;
        }
    }

    for (let key in args) {
        if (resource.unsafeParams || (args.hasOwnProperty(key) && resource.params.hasOwnProperty(key))) {
            if (resource.renameParams.hasOwnProperty(key)) {
                delete r[key];
                r[resource.renameParams[key]] = args[key];
            } else {
                r[key] = args[key];
            }

            if (isUndefined(r[key])) {
                delete r[key];
            }
        }
    }

    let url = resource.url;
    let env = getHTTPEnvironment(resource.environment);
    let auth = {};

    if (env && env.url) {
        url = env.url + url;
        if (!isUndefined(env.auth) && !isUndefined(env.auth.user)){
            auth = env.auth;
        }
    }

    let toDelete = extractFillData(url, r, Settings.RESOURCE_PARAM_LEFT_SEPARATOR, Settings.RESOURCE_PARAM_RIGHT_SEPARATOR);
    let link = fill(url, r, Settings.RESOURCE_PARAM_LEFT_SEPARATOR, Settings.RESOURCE_PARAM_RIGHT_SEPARATOR);
    r = deleteObjectKeys(r, toDelete);

    if (method === 'get' || method === 'open') {
        let stringParams = paramsToString(r);
        link = [link, stringParams].join('?');
        r = {};
    }

    let headers = undefined;
    if (resource.isFileUpload) {
        headers = {
            'Content-Type': 'multipart/form-data'
        };

        let formData = new FormData();
        for (let k in r){
            if (r.hasOwnProperty(k)){
                formData.append(k, r[k]);
            }
        }
        r = formData;
    }

    return {
        url: link,
        method,
        data: r,
        auth: auth,
        validateStatus: (status: number) => getDefaultValidateStatus(status, resource.validStatuses),
        headers: headers
    }
}

/**
 *
 * @param resource
 * @param params
 * @returns {Promise<unknown>|Promise<Result>|Promise<any>|Promise|Promise<AxiosResponse<any>>}
 */
export const callHTTPResource = function(resource: LktResource, params: ILktObject = {}) {

    const emptyResponse = (resolve: any, reject: any) => {
        resolve(undefined);
    };

    if (isUndefined(resource)) {
        console.error('Invalid resource', resource);
        return emptyPromise(emptyResponse);
    }

    if (resource.isFetching){
        return emptyPromise(emptyResponse);
    }

    let data = buildResource(resource, params);

    if (data.method === 'get' && resource.cacheTime > 0 && !resource.forceRefreshFlag && resource.cache[data.url]){
        let now = time();
        let limit = resource.cache[data.url].moment + resource.cacheTime;

        if (limit - now > 0){
            return emptyPromise((resolve: any, reject: any) => {
                return resolve((() => {
                    if (isFunction(resource.onSuccess)) {
                        return resource.onSuccess(resource.cache[data.url].r);
                    }
                    return resource.cache[data.url].r;
                })());
            });
        }
    }

    switch (data.method) {
        case 'get':
        case 'post':
        case 'put':
        case 'delete':
            resource.isFetching = true;
            //@ts-ignore
            return axios(data).then(promise => {
                resource.isFetching = false;
                if (data.method === 'get' && resource.cacheTime > 0){
                    resource.cache[data.url] = {
                        moment: time(),
                        r: promise,
                    };
                    resource.forceRefreshFlag = false;
                }

                if (isFunction(resource.onSuccess)) {
                    return resource.onSuccess(promise);
                }
                return promise;
            }).catch(error => {
                resource.isFetching = false;
                return Promise.reject(new Error(error));
            });
        case 'download':
        case 'open':
            return axios.get(data.url, {'responseType': 'blob'}).then(r => {
                let contentDisposition = r.headers['content-disposition'],
                    fileName = '';
                if (contentDisposition){
                    let contentDispositionAux = contentDisposition.split(';');
                    contentDispositionAux.forEach(z => {
                        let y = z.split('=');
                        if (trim(y[0]) === 'filename'){
                            let n = trim(y[1]);
                            n = trim(n, '"');
                            fileName = n;
                        }
                    });
                }

                //@ts-ignore
                window.download(r.data, fileName);
                if (isFunction(resource.onSuccess)) {
                    return resource.onSuccess(r);
                }
                return r;
            }).catch(error => {
                return error;
            });

        default:
            console.warn('Error: Invalid method');
    }
};

export const $http = (resourceName: string = '', params: ILktObject =  {}, options: IMixinOptions = {}) => {
    const resource = getHTTPResource(resourceName);
    options = prepareHTTPResourceOptions(options);

    if (options.forceRefresh === true){
        resource.setForceRefresh(true);
    }

    return callHTTPResource(resource, params);
};