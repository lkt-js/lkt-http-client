import {getHTTPResource} from "../functions/startup-functions";
import {callHTTPResource} from "../functions/http-functions";
import {prepareHTTPResourceOptions} from "../functions/helpers";

export const LktHttpMixin = {
    methods: {
        /**
         *
         * @param resourceName
         * @param params
         * @param options
         * @returns {Promise<unknown>|Promise<*>|*}
         */
        '$http'(resourceName = '', params =  {}, options = {}){
            const resource = getHTTPResource(resourceName);
            options = prepareHTTPResourceOptions(options);

            if (options.forceRefresh === true){
                resource.setForceRefresh(true);
            }

            return callHTTPResource(resource, params);
        },

        /**
         * @deprecated Use $http instead
         * @param resourceName
         * @param params
         * @param options
         * @returns {Promise<unknown>|Promise<*>|*}
         */
        '$api'(resourceName = '', params =  {}, options = {}){
            return this.$http(resourceName, params, options);
        }
    }
}