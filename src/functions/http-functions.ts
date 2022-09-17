import {LktObject} from "lkt-ts-interfaces";

import {LktResource} from "../classes/LktResource";
import {SUCCESS_STATUSES} from "../constants";
import {IMixinOptions} from "../interfaces/IMixinOptions";
import {prepareHTTPResourceOptions} from "./helpers";
import {getHTTPResource} from "./startup-functions";

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
 * @param params
 */
export const callHTTPResource = function(resource: LktResource, params: LktObject = {}) {

    return resource.call(params);
};

export const $http = (resourceName: string = '', params: LktObject =  {}, options: IMixinOptions = {}) => {
    const resource = getHTTPResource(resourceName);
    options = prepareHTTPResourceOptions(options);

    // if (options.forceRefresh === true){
    //     resource.setForceRefresh(true);
    // }

    return callHTTPResource(resource, params);
};