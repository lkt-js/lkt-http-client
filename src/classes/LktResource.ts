import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {successPromise} from 'lkt-control-tools';
import {trim} from 'lkt-string-tools';
import {LktObject} from 'lkt-ts-interfaces';

import {paramsToString} from '../functions/helpers';
import {ResourceData} from '../types/ResourceData';
import {DataTypeValue} from '../value-objects/DataTypeValue';
import {EnvironmentValue} from '../value-objects/EnvironmentValue';
import {IsFileUploadValue} from '../value-objects/IsFileUploadValue';
import {MaxPageDigValue} from "../value-objects/MaxPageDigValue";
import {ResourceFetchStatus} from '../value-objects/ResourceFetchStatus';
import {ResourceMethodValue} from '../value-objects/ResourceMethodValue';
import {ResourceNameValue} from '../value-objects/ResourceNameValue';
import {ResourceParamsValue} from '../value-objects/ResourceParamsValue';
import {ResourceUrlValue} from '../value-objects/ResourceUrlValue';
import {ResponseSuccessHookValue} from '../value-objects/ResponseSuccessHookValue';
import {ReturnsFullResponseValue} from '../value-objects/ReturnsFullResponseValue';
import {ReturnsResponseDigValue} from '../value-objects/ReturnsResponseDigValue';
import {ValidResponseStatuses} from '../value-objects/ValidResponseStatuses';
import {ResourceBuild} from './ResourceBuild';
import {PermDigValue} from "../value-objects/PermDigValue";
import {ModificationsDigValue} from "../value-objects/ModificationsDigValue";
import {HTTPResponse} from "../types/HTTPResponse";
import {MapDataValue} from "../value-objects/MapDataValue";
import {DigToAutoReloadIdValue} from "../value-objects/DigToAutoReloadIdValue";
import {CustomDataValue} from "../value-objects/CustomDataValue";
import {mergeObjects} from "lkt-object-tools";

export class LktResource {
    private readonly data: ResourceData;

    private url: ResourceUrlValue;
    public name: ResourceNameValue;
    private method: ResourceMethodValue;
    private environment: EnvironmentValue;
    private dataType: DataTypeValue;
    private params: ResourceParamsValue;
    private isFileUpload: IsFileUploadValue;
    private validStatuses: ValidResponseStatuses;
    private fetchStatus: ResourceFetchStatus;
    private onSuccess: ResponseSuccessHookValue;
    private mapData: MapDataValue;
    private returnsFullResponse: ReturnsFullResponseValue;
    private returnsResponseDig: ReturnsResponseDigValue;
    private maxPageDig: MaxPageDigValue;
    private permDig: PermDigValue;
    private modificationsDig: ModificationsDigValue;
    private digToAutoReloadId: DigToAutoReloadIdValue;
    private custom: CustomDataValue;

    constructor(data: ResourceData) {
        this.data = data;

        this.url = new ResourceUrlValue(data.url);
        this.name = new ResourceNameValue(data.name);
        this.method = new ResourceMethodValue(data.method);
        this.environment = new EnvironmentValue(data.environment);
        this.dataType = new DataTypeValue(data.dataType);
        this.params = new ResourceParamsValue(data.params);
        this.isFileUpload = new IsFileUploadValue(data.isFileUpload);
        this.validStatuses = new ValidResponseStatuses(data.validStatuses);
        this.fetchStatus = new ResourceFetchStatus();
        this.onSuccess = new ResponseSuccessHookValue(data.onSuccess);
        this.mapData = new MapDataValue(data.mapData);
        this.returnsFullResponse = new ReturnsFullResponseValue(data.returnsFullResponse);
        this.returnsResponseDig = new ReturnsResponseDigValue(data.digToData);
        this.maxPageDig = new MaxPageDigValue(data.digToMaxPage);
        this.permDig = new PermDigValue(data.digToPerms);
        this.modificationsDig = new ModificationsDigValue(data.digToModifications);
        this.digToAutoReloadId = new DigToAutoReloadIdValue(data.digToAutoReloadId);
        this.custom = new CustomDataValue(data.custom);
    }

    build(params: LktObject) {

        let baseParams = this.environment.getParams();
        let customParams = mergeObjects(baseParams, params);

        let data: LktObject = this.params.prepareValues(
            customParams,
            this.isFileUpload.value,
            baseParams
        );

        const url = this.url.prepare(this.environment.getUrl());
        let link = this.params.replaceUrlValues(url, customParams);

        if (this.method.hasUrlParams()) {
            const stringParams = paramsToString(data);
            if (stringParams.length > 0) link = [link, stringParams].join('?');
            data = {};
        }

        const statusValidator = (status: number) => this.validStatuses.includes(status);

        let headers:LktObject = {},
            envHeaders = this.environment.getHeaders();

        headers = mergeObjects(headers, envHeaders);

        if (this.isFileUpload.value) {
            headers = mergeObjects(headers, {'Content-Type': 'multipart/form-data'});
        }

        return new ResourceBuild(
            link,
            this.method.toPrimitive(),
            data,
            this.environment.getAuth(),
            statusValidator,
            headers
        );
    }

    async call(params: LktObject): Promise<any> {
        const build = this.build(params);

        if (this.fetchStatus.inProgress()) return successPromise(undefined, undefined);

        const instance = axios.create({
            headers: build.headers
        });

        this.fetchStatus.start();
        switch (build.method) {
            case 'get':
                return await instance.get(build.url, build as unknown as AxiosRequestConfig)
                    .then((response: AxiosResponse) => this.parseResponse(response)).catch((error: AxiosError) => this.parseError(error));

            case 'post':
                return await instance.post(build.url, build.data, build as unknown as AxiosRequestConfig)
                    .then((response: AxiosResponse) => this.parseResponse(response)).catch((error: AxiosError) => this.parseError(error));

            case 'put':
                return await instance.put(build.url, build.data, build as unknown as AxiosRequestConfig)
                    .then((response: AxiosResponse) => this.parseResponse(response)).catch((error: AxiosError) => this.parseError(error));

            case 'delete':
                return await instance.delete(build.url, build as unknown as AxiosRequestConfig)
                    .then((response: AxiosResponse) => this.parseResponse(response)).catch((error: AxiosError) => this.parseError(error));

            case 'download':
            case 'open':
                return await axios
                    .get(build.url, {responseType: 'blob'})
                    .then((r: AxiosResponse) => {
                        this.fetchStatus.stop();
                        const contentDisposition = r.headers['content-disposition'];
                        let fileName = '';
                        if (contentDisposition) {
                            const contentDispositionAux = contentDisposition.split(';');
                            contentDispositionAux.forEach((z:string) => {
                                const y = z.split('=');
                                if (trim(y[0]) === 'filename') {
                                    let n = trim(y[1]);
                                    n = trim(n, '"');
                                    fileName = n;
                                }
                            });
                        }

                        //@ts-ignore
                        window.download(r.data, fileName);

                        let perms: string[] = [];

                        const R: HTTPResponse = {data: r.data, maxPage: 0, perms, modifications: {}, custom: {}, response: r, success: true, httpStatus: r.status, autoReloadId: 0};

                        if (this.onSuccess.hasActionDefined()) return this.onSuccess.run(R);
                        return R;
                    })
                    .catch((error) => {
                        return error;
                    });

            default:
                throw new Error(
                    `Error: Invalid method in call ${JSON.stringify(build)}`
                );
        }
    }

    parseResponse(response: AxiosResponse): HTTPResponse {
        this.fetchStatus.stop();

        let r = this.returnsFullResponse.value ? response : response.data;

        let maxPage = -1;
        if (this.maxPageDig.hasToDig()) maxPage = this.maxPageDig.dig(r);

        let perms: string[] = [];
        if (this.permDig.hasToDig()) perms = this.permDig.dig(r);

        let custom = {};
        if (this.custom.hasToDig()) custom = this.custom.dig(r);

        let modifications: LktObject = {};
        if (this.modificationsDig.hasToDig()) modifications = this.modificationsDig.dig(r);

        let autoReloadId: number|string = '';
        if (this.digToAutoReloadId.hasToDig()) autoReloadId = this.digToAutoReloadId.dig(r);

        if (this.returnsResponseDig.hasToDig()) r = this.returnsResponseDig.dig(r);

        if (this.mapData.hasActionDefined()) r = this.mapData.run(r);

        const R: HTTPResponse = {data: r, maxPage, perms, modifications, custom, response, success: true, httpStatus: response.status, autoReloadId};

        if (this.onSuccess.hasActionDefined()) return this.onSuccess.run(R);
        return R;
    }

    parseError(error: AxiosError): HTTPResponse {
        this.fetchStatus.stop();
        let perms: string[] = [];
        const R: HTTPResponse = {data: {
                status: typeof error.response === 'undefined' ? 500 : error.response.status
            }, maxPage: -1, perms, modifications: {}, custom: {}, response: error, success: false, httpStatus: typeof error.response === 'undefined' ? 500 : error.response.status, autoReloadId: 0};
        return R;
    }
}
