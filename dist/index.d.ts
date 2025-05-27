import { LktObject } from 'lkt-ts-interfaces';
import { AxiosResponse, AxiosError } from 'axios';

interface ResourceCallerConfig {
    resource: string;
    params?: LktObject;
}

interface ResourceParam {
    default?: any;
    renameTo?: string;
    type?: 'string' | 'number' | 'array' | 'object' | 'boolean';
}

interface ResourceParamStack {
    [key: string]: ResourceParam;
}

declare class ResourceAliasValue {
    private readonly value;
    constructor(value?: string);
    exists(): boolean;
    call(params: ResourceParamStack): Promise<any>;
}

declare class ResourceCallDataValue {
    readonly value: ResourceParamStack;
    constructor(value?: ResourceParamStack);
    setParam(key: string, value: any): void;
    getParams(): ResourceParamStack;
}

declare class ResourceCaller {
    resource: ResourceAliasValue;
    params: ResourceCallDataValue;
    constructor(config: ResourceCallerConfig);
    isCallable(): boolean;
    setParam(key: string, value: any): void;
    setParams(params: LktObject): void;
    call(): Promise<any>;
}

/**
 *
 * @param name
 */
declare const existsHTTPResource: (name: string) => boolean;

type ResourceDataType = 'json';

declare enum ResourceMethod {
    Get = "get",
    Post = "post",
    Put = "put",
    Delete = "delete",
    Open = "open",
    Download = "download"
}

type StatusValidator = (status: number) => boolean;

type DataMapper = Function;

declare enum ModificationHandleType {
    Auto = "auto",
    OverrideData = "override-data"
}

interface ResourceConfig {
    url: string;
    name: string;
    method?: ResourceMethod;
    headers?: LktObject;
    dataType?: ResourceDataType;
    isFileUpload?: boolean;
    validStatuses?: number[];
    validateStatus?: StatusValidator;
    environment?: string;
    params?: ResourceParamStack;
    returnsFullResponse?: boolean;
    isFullUrl?: boolean;
    keepUrlParams?: boolean;
    onSuccess?: Function;
    mapData?: DataMapper;
    digToData?: string;
    digToMaxPage?: string;
    digToPerms?: string;
    digToModifications?: string;
    digToAutoReloadId?: string;
    digToValidationCode?: string;
    digToValidationMessage?: string;
    digToValidationData?: string;
    digToRedirect?: string;
    custom?: LktObject;
    modificationHandleType?: ModificationHandleType;
}

declare class ResourceNameValue {
    readonly value: string;
    constructor(value: string);
}

type UserAuth = {
    user?: string;
    password?: string;
};

declare class ResourceBuild {
    readonly url: string;
    readonly method: ResourceMethod;
    readonly data: LktObject;
    readonly auth: UserAuth;
    readonly statusValidator: StatusValidator;
    readonly headers: LktObject;
    constructor(url: string, method: ResourceMethod, data: LktObject, auth: UserAuth, statusValidator: StatusValidator, headers: LktObject);
}

interface HTTPResponse {
    data: LktObject | any[];
    maxPage: number;
    perms: string[];
    modifications: LktObject;
    response: AxiosResponse | AxiosError | undefined;
    success: boolean;
    httpStatus: number;
    autoReloadId: number | string;
    custom: LktObject;
    contentType: string;
    validationCode: string;
    validationMessage: string;
    validationData: LktObject;
}

declare class LktResource {
    private readonly data;
    private url;
    name: ResourceNameValue;
    private method;
    private environment;
    private dataType;
    private params;
    private isFileUpload;
    private validStatuses;
    private fetchStatus;
    private onSuccess;
    private mapData;
    private returnsFullResponse;
    private returnsResponseDig;
    private maxPageDig;
    private permDig;
    private modificationsDig;
    private digToAutoReloadId;
    private digToValidationCode;
    private digToValidationMessage;
    private digToValidationData;
    private digToRedirect;
    private custom;
    private keepUrlParams;
    private isFullUrl;
    private modificationHandleType;
    constructor(data: ResourceConfig);
    build(params: LktObject): ResourceBuild;
    call(params: LktObject): Promise<any>;
    parseResponse(response: AxiosResponse): HTTPResponse;
    parseError(error: AxiosError): HTTPResponse;
}

declare const httpCall: (resourceName?: string | LktResource, params?: LktObject) => Promise<any>;

declare const debugLktHttpClient: (state?: boolean) => void;

declare class EnvironmentUrlValue {
    readonly value: string;
    constructor(value: string);
}

declare class ResourceParamsValue {
    readonly value: ResourceParamStack;
    constructor(value?: ResourceParamStack);
    prepareValues(values?: LktObject, asFormData?: boolean, envParams?: LktObject): LktObject;
    replaceUrlValues(url: string, values?: LktObject): string;
}

declare class LktEnvironment {
    name: ResourceNameValue;
    url: EnvironmentUrlValue;
    params: ResourceParamsValue;
    headers: LktObject;
    auth?: UserAuth;
    constructor(name: string, url: string, auth?: UserAuth, params?: ResourceParamStack, headers?: LktObject);
    getParams(): any;
}

interface EnvironmentData {
    url: string;
    name: string;
    auth?: UserAuth;
    params?: LktObject;
    headers?: LktObject;
}

declare const createHTTPGetResource: (data: ResourceConfig) => LktResource | undefined;
declare const createHTTPPostResource: (data: ResourceConfig) => LktResource | undefined;
declare const createHTTPPutResource: (data: ResourceConfig) => LktResource | undefined;
declare const createHTTPDeleteResource: (data: ResourceConfig) => LktResource | undefined;
declare const createHTTPOpenResource: (data: ResourceConfig) => LktResource | undefined;
declare const createHTTPDownloadResource: (data: ResourceConfig) => LktResource | undefined;
/**
 *
 * @param data
 */
declare const createHTTPEnvironment: (data: EnvironmentData) => LktEnvironment | undefined;
/**
 *
 * @param resource
 */
declare const getHTTPResource: (resource: string) => LktResource | undefined;
/**
 *
 * @param environment
 */
declare const getHTTPEnvironment: (environment: string) => LktEnvironment | undefined;

declare const LktHttpClient: {
    install: (app: any, options: LktObject) => void;
};

export { type HTTPResponse, ModificationHandleType, ResourceCaller, type ResourceCallerConfig, ResourceMethod, createHTTPDeleteResource, createHTTPDownloadResource, createHTTPEnvironment, createHTTPGetResource, createHTTPOpenResource, createHTTPPostResource, createHTTPPutResource, debugLktHttpClient, LktHttpClient as default, existsHTTPResource, getHTTPEnvironment, getHTTPResource, httpCall };
