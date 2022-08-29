import {$http} from "../functions/http-functions";
import {ILktObject} from "lkt-tools";
import {IMixinOptions} from "../interfaces/IMixinOptions";

export const LktHttpMixin = {
    methods: {
        /**
         *
         * @param resourceName
         * @param params
         * @param options
         * @returns {Promise<unknown>|Promise<*>|*}
         */
        '$http'(resourceName: string = '', params: ILktObject =  {}, options: IMixinOptions = {}){
            return $http(resourceName, params, options);
        },

        /**
         * @deprecated Use $http instead
         * @param resourceName
         * @param params
         * @param options
         * @returns {Promise<unknown>|Promise<*>|*}
         */
        '$api'(resourceName: string = '', params: ILktObject =  {}, options: IMixinOptions = {}){
            return $http(resourceName, params, options);
        }
    }
}