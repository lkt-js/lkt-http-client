import {SUCCESS_STATUSES} from "../constants";
import {callHTTPResource} from "../functions/http-functions";
import {ILktObject} from "lkt-tools";

export class LktResource {

    name: string;
    url: string;
    method: string = 'get';
    dataType: string = 'json';
    currentPage: number = -1;
    params: ILktObject = {};
    renameParams: ILktObject = {};
    environment: string = '';

    isFetching: boolean = false;
    isFileUpload: boolean = false;
    forceRefreshFlag: boolean = false;
    unsafeParams: boolean = false;

    onSuccess: Function = undefined;
    validStatuses: Array<number> = SUCCESS_STATUSES;

    cacheTime: number = 0;
    cache: ILktObject = {};

    constructor(name: string, url: string, method: string = 'get') {
        this.name = name;
        this.url = url;
        this.method = method;
    }

    setEnvironment(env: string): this {
        this.environment = env;
        return this;
    }

    setDataTypeJSON(): this {
        this.dataType = 'json';
        return this;
    }

    enableUnsafeParams(): this {
        this.unsafeParams = true;
        return this;
    }

    setIsFileUpload(status: boolean = true): this {
        this.isFileUpload = status;
        return this;
    }

    setParam(property: string): this {
        this.params[property] = {type: undefined};
        return this;
    }

    renameParam(param: string, rename: string): this {
        this.params[param] = rename;
        return this;
    }

    setSuccessStatuses(statuses: number[] = SUCCESS_STATUSES): this {
        this.validStatuses = statuses;
        return this;
    }

    setForceRefresh(status: boolean = true): this {
        this.forceRefreshFlag = status;
        return this;
    }

    setOnSuccess(fn: Function): this {
        this.onSuccess = fn;
        return this;
    }

    call(params: ILktObject = {}) {
        return callHTTPResource(this, params);
    }
}