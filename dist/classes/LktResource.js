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
import { mergeObjects } from "lkt-object-tools";
import { debug } from "../functions/debug";
import { KeepUrlParamsValue } from "../value-objects/KeepUrlParamsValue";
import { Settings } from "../settings/Settings";
import { IsFullUrlValue } from "../value-objects/IsFullUrlValue";
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
        this.keepUrlParams = new KeepUrlParamsValue(data.keepUrlParams);
        this.isFullUrl = new IsFullUrlValue(data.isFullUrl);
    }
    build(params) {
        debug('Build resource', this.name.value, this.url.value, this.method.value);
        debug('Given params', params);
        let baseParams = this.environment.getParams();
        let customParams = mergeObjects(baseParams, params);
        let data = this.params.prepareValues(customParams, this.isFileUpload.value, baseParams);
        debug('Prepared data', data);
        let baseUrl = this.isFullUrl.value ? '' : this.environment.getUrl();
        const url = this.url.prepare(baseUrl);
        let link = this.params.replaceUrlValues(url, customParams);
        if (this.method.hasUrlParams()) {
            if (!this.keepUrlParams.keepValues()) {
                let left = Settings.RESOURCE_PARAM_LEFT_SEPARATOR, right = Settings.RESOURCE_PARAM_RIGHT_SEPARATOR, regex = new RegExp(`[${left}${right}]`), dataKeys = Object.keys(data);
                let _url = url.split(regex);
                _url = _url.filter(z => dataKeys.includes(z));
                _url.forEach(z => delete data[z]);
                debug('Remove data from string params', _url);
                debug('Final prepared data', data);
            }
            const stringParams = paramsToString(data);
            if (stringParams.length > 0)
                link = [link, stringParams].join('?');
            data = {};
        }
        debug('Prepared url', link);
        const statusValidator = (status) => this.validStatuses.includes(status);
        let headers = {}, envHeaders = this.environment.getHeaders();
        headers = mergeObjects(headers, envHeaders);
        if (this.isFileUpload.value) {
            headers = mergeObjects(headers, { 'Content-Type': 'multipart/form-data' });
        }
        debug('Prepared headers', headers);
        return new ResourceBuild(link, this.method.toPrimitive(), data, this.environment.getAuth(), statusValidator, headers);
    }
    async call(params) {
        const build = this.build(params);
        debug('Call resource -> build:', build);
        if (this.fetchStatus.inProgress())
            return successPromise(undefined, undefined);
        const instance = axios.create({
            headers: build.headers
        });
        this.fetchStatus.start();
        switch (build.method) {
            case 'get':
                return await instance.get(build.url, build)
                    .then((response) => this.parseResponse(response)).catch((error) => this.parseError(error));
            case 'post':
                return await instance.post(build.url, build.data, build)
                    .then((response) => this.parseResponse(response)).catch((error) => this.parseError(error));
            case 'put':
                return await instance.put(build.url, build.data, build)
                    .then((response) => this.parseResponse(response)).catch((error) => this.parseError(error));
            case 'delete':
                return await instance.delete(build.url, build)
                    .then((response) => this.parseResponse(response)).catch((error) => this.parseError(error));
            case 'download':
            case 'open':
                //@ts-ignore
                build.responseType = 'blob';
                return await instance.get(build.url, build)
                    .then((r) => {
                    this.fetchStatus.stop();
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
                    const R = { data: r.data, maxPage: 0, perms, modifications: {}, custom: {}, response: r, success: true, httpStatus: r.status, autoReloadId: 0, contentType: '' };
                    if (this.onSuccess.hasActionDefined())
                        return this.onSuccess.run(R);
                    return R;
                }).catch((error) => this.parseError(error));
            default:
                throw new Error(`Error: Invalid method in call ${JSON.stringify(build)}`);
        }
    }
    parseResponse(response) {
        debug('Parse response:', response);
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
        let contentType = response.headers["content-type"];
        const R = { data: r, maxPage, perms, modifications, custom, response, success: true, httpStatus: response.status, autoReloadId, contentType };
        debug('Parsed response:', R);
        if (this.onSuccess.hasActionDefined())
            return this.onSuccess.run(R);
        return R;
    }
    parseError(error) {
        this.fetchStatus.stop();
        let perms = [];
        let contentType = error.response?.headers["content-type"];
        const R = { data: {
                status: typeof error.response === 'undefined' ? 500 : error.response.status
            }, maxPage: -1, perms, modifications: {}, custom: {}, response: error, success: false, httpStatus: typeof error.response === 'undefined' ? 500 : error.response.status, autoReloadId: 0, contentType };
        return R;
    }
}
