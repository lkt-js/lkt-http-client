import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { successPromise } from 'lkt-control-tools';
import { trim } from 'lkt-string-tools';
import { LktObject } from 'lkt-ts-interfaces';

import { paramsToString } from '../functions/helpers';
import { ResourceData } from '../types/ResourceData';
import { DataTypeValue } from '../value-objects/DataTypeValue';
import { EnvironmentValue } from '../value-objects/EnvironmentValue';
import { IsFileUploadValue } from '../value-objects/IsFileUploadValue';
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
  private returnsFullResponse: ReturnsFullResponseValue;
  private returnsResponseDig: ReturnsResponseDigValue;

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
    this.returnsFullResponse = new ReturnsFullResponseValue(
      data.returnsFullResponse
    );
    this.returnsResponseDig = new ReturnsResponseDigValue(
      data.returnsResponseDig
    );
  }

  build(params: LktObject) {
    let data: LktObject = this.params.prepareValues(
      params,
      this.isFileUpload.value
    );

    const url = this.url.prepare(this.environment.getUrl());
    let link = this.params.replaceUrlValues(url, params);

    if (this.method.hasUrlParams()) {
      const stringParams = paramsToString(data);
      if (stringParams.length > 0) {
        link = [link, stringParams].join('?');
      }
      data = {};
    }

    const statusValidator = (status: number) =>
      this.validStatuses.includes(status);

    let headers = undefined;
    if (this.isFileUpload.value) {
      headers = {
        'Content-Type': 'multipart/form-data',
      };
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

  call(params: LktObject): Promise<any> {
    const build = this.build(params);

    if (this.fetchStatus.inProgress()) {
      return successPromise();
    }

    switch (build.method) {
      case 'get':
      case 'post':
      case 'put':
      case 'delete':
        this.fetchStatus.start();

        return axios(build as unknown as AxiosRequestConfig)
          .then((response: AxiosResponse) => {
            this.fetchStatus.stop();

            let r = this.returnsFullResponse.value ? response : response.data;

            if (this.returnsResponseDig.hasToDig()) {
              r = this.returnsResponseDig.dig(r);
            }

            if (this.onSuccess.hasActionDefined()) {
              return this.onSuccess.run(r);
            }
            return r;
          })
          .catch((error) => {
            this.fetchStatus.stop();
            return Promise.reject(new Error(error));
          });

      case 'download':
      case 'open':
        return axios
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

            if (this.onSuccess.hasActionDefined()) {
              return this.onSuccess.run(r);
            }
            return r;
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
}
