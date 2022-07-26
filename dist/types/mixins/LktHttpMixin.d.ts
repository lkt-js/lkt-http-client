import { ILktObject } from "lkt-tools";
import { IMixinOptions } from "../interfaces/IMixinOptions";
export declare const LktHttpMixin: {
    methods: {
        /**
         *
         * @param resourceName
         * @param params
         * @param options
         * @returns {Promise<unknown>|Promise<*>|*}
         */
        $http(resourceName?: string, params?: ILktObject, options?: IMixinOptions): Promise<any>;
        /**
         * @deprecated Use $http instead
         * @param resourceName
         * @param params
         * @param options
         * @returns {Promise<unknown>|Promise<*>|*}
         */
        $api(resourceName?: string, params?: ILktObject, options?: IMixinOptions): any;
    };
};
