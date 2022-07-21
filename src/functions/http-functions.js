import {
    cloneObject,
    deleteObjectKeys,
    emptyPromise,
    extractFillData,
    fill,
    isFunction,
    isUndefined,
    time, trim
} from "lkt-tools";
import {SUCCESS_STATUSES} from "../constants";
import axios from "axios";
import {paramsToString} from "./helpers";
import {getHTTPEnvironment} from "./startup-functions";

/**
 *
 * @param status
 * @param validStatuses
 * @returns {boolean}
 */
export const getDefaultValidateStatus = (status, validStatuses = SUCCESS_STATUSES) =>  {
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
export const buildResource = (resource, args) => {
    const p = cloneObject(resource.params);
    const method = resource.method.toLowerCase();
    let r = {};
    for (let k in p) {
        if (p.hasOwnProperty(k)) {
            r[k] = p[k].default;
        }
    }

    for (let key in args) {
        if (resource.unsafeParams || key === resource.paginationVariable || (args.hasOwnProperty(key) && resource.params.hasOwnProperty(key))) {
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

    let toDelete = extractFillData(url, r, resource.fillLeftSeparator, resource.fillRightSeparator);
    let link = fill(url, r, resource.fillLeftSeparator, resource.fillRightSeparator);
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
        validateStatus: (status) => getDefaultValidateStatus(status, resource.validStatuses),
        headers: headers
    }
}

/**
 *
 * @param resource
 * @param params
 * @returns {Promise<unknown>|Promise<Result>|Promise<any>|Promise|Promise<AxiosResponse<any>>}
 */
export const callHTTPResource = function(resource, params = {}) {

    if (resource.isFetching && !resource.enableMultipleCalling){
        return new Promise( (resolve, reject) => {
            resolve(undefined);
        });
    }

    let data = buildResource(resource, params, resource.environment);

    if (data.method === 'get' && resource.cacheTime > 0 && !resource.forceRefreshFlag && resource.cache[data.url]){
        let now = time();
        let limit = resource.cache[data.url].moment + resource.cacheTime;

        if (limit - now > 0){
            return emptyPromise((resolve, reject) => {
                return resolve((() => {
                    if (isFunction(resource.success)) {
                        return resource.success(resource.cache[data.url].r);
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
            return axios(data).then(promise => {
                resource.isFetching = false;
                if (data.method === 'get' && resource.cacheTime > 0){
                    resource.cache[data.url] = {
                        moment: time(),
                        r: promise,
                    };
                    resource.forceRefreshFlag = false;
                }

                if (isFunction(resource.success)) {
                    return resource.success(promise);
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
                    contentDisposition = contentDisposition.split(';');
                    contentDisposition.forEach(z => {
                        let y = z.split('=');
                        if (trim(y[0]) === 'filename'){
                            let n = trim(y[1]);
                            n = trim(n, '"');
                            fileName = n;
                        }
                    });
                }
                window.download(r.data, fileName);
                if (isFunction(resource.success)) {
                    return resource.success(r);
                }
                return r;
            }).catch(error => {
                return error;
            });

        default:
            console.warn('Error: Invalid method');
    }
};