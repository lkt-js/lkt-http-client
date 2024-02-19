import axios from 'axios';
import { successPromise } from 'lkt-control-tools';
import { trim } from 'lkt-string-tools';
import { paramsToString } from '../functions/helpers';
import { DataTypeValue } from '../value-objects/DataTypeValue';
import { EnvironmentValue } from '../value-objects/EnvironmentValue';
import { IsFileUploadValue } from '../value-objects/IsFileUploadValue';
import { MaxPageDigValue } from "../value-objects/MaxPageDigValue";
import { ResourceFetchStatus } from '../value-objects/ResourceFetchStatus';
import { ResourceMethodValue } from '../value-objects/ResourceMethodValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
import { ResourceParamsValue } from '../value-objects/ResourceParamsValue';
import { ResourceUrlValue } from '../value-objects/ResourceUrlValue';
import { ResponseSuccessHookValue } from '../value-objects/ResponseSuccessHookValue';
import { ReturnsFullResponseValue } from '../value-objects/ReturnsFullResponseValue';
import { ReturnsResponseDigValue } from '../value-objects/ReturnsResponseDigValue';
import { ValidResponseStatuses } from '../value-objects/ValidResponseStatuses';
import { ResourceBuild } from './ResourceBuild';
import { PermDigValue } from "../value-objects/PermDigValue";
import { ModificationsDigValue } from "../value-objects/ModificationsDigValue";
import { MapDataValue } from "../value-objects/MapDataValue";
import { DigToAutoReloadIdValue } from "../value-objects/DigToAutoReloadIdValue";
import { CustomDataValue } from "../value-objects/CustomDataValue";
export class LktResource {
    constructor(data) {
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
    build(params) {
        let data = this.params.prepareValues(params, this.isFileUpload.value);
        const url = this.url.prepare(this.environment.getUrl());
        let link = this.params.replaceUrlValues(url, params);
        if (this.method.hasUrlParams()) {
            const stringParams = paramsToString(data);
            if (stringParams.length > 0)
                link = [link, stringParams].join('?');
            data = {};
        }
        const statusValidator = (status) => this.validStatuses.includes(status);
        let headers = {};
        if (this.isFileUpload.value) {
            headers = { 'Content-Type': 'multipart/form-data' };
        }
        return new ResourceBuild(link, this.method.toPrimitive(), data, this.environment.getAuth(), statusValidator, headers);
    }
    async call(params) {
        const build = this.build(params);
        if (this.fetchStatus.inProgress())
            return successPromise(undefined, undefined);
        switch (build.method) {
            case 'get':
            case 'post':
            case 'put':
            case 'delete':
                this.fetchStatus.start();
                return await axios(build)
                    .then((response) => {
                    this.fetchStatus.stop();
                    let r = this.returnsFullResponse.value ? response : response.data;
                    let maxPage = -1;
                    if (this.maxPageDig.hasToDig())
                        maxPage = this.maxPageDig.dig(r);
                    let perms = [];
                    if (this.permDig.hasToDig())
                        perms = this.permDig.dig(r);
                    let custom = {};
                    if (this.custom.hasToDig())
                        custom = this.custom.dig(r);
                    let modifications = {};
                    if (this.modificationsDig.hasToDig())
                        modifications = this.modificationsDig.dig(r);
                    let autoReloadId = '';
                    if (this.digToAutoReloadId.hasToDig())
                        autoReloadId = this.digToAutoReloadId.dig(r);
                    if (this.returnsResponseDig.hasToDig())
                        r = this.returnsResponseDig.dig(r);
                    if (this.mapData.hasActionDefined())
                        r = this.mapData.run(r);
                    const R = { data: r, maxPage, perms, modifications, custom, response, success: true, httpStatus: response.status, autoReloadId };
                    if (this.onSuccess.hasActionDefined())
                        return this.onSuccess.run(R);
                    return R;
                })
                    .catch((error) => {
                    this.fetchStatus.stop();
                    let perms = [];
                    const R = { data: {
                            status: typeof error.response === 'undefined' ? 500 : error.response.status
                        }, maxPage: -1, perms, modifications: {}, custom: {}, response: error, success: false, httpStatus: typeof error.response === 'undefined' ? 500 : error.response.status, autoReloadId: 0 };
                    return R;
                });
            case 'download':
            case 'open':
                return await axios
                    .get(build.url, { responseType: 'blob' })
                    .then((r) => {
                    const contentDisposition = r.headers['content-disposition'];
                    let fileName = '';
                    if (contentDisposition) {
                        const contentDispositionAux = contentDisposition.split(';');
                        contentDispositionAux.forEach((z) => {
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
                    let perms = [];
                    const R = { data: r.data, maxPage: 0, perms, modifications: {}, custom: {}, response: r, success: true, httpStatus: r.status, autoReloadId: 0 };
                    if (this.onSuccess.hasActionDefined())
                        return this.onSuccess.run(R);
                    return R;
                })
                    .catch((error) => {
                    return error;
                });
            default:
                throw new Error(`Error: Invalid method in call ${JSON.stringify(build)}`);
        }
    }
}