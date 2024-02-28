import { UserAuth } from '../types/UserAuth';
import { EnvironmentUrlValue } from '../value-objects/EnvironmentUrlValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
import {ResourceParamsValue} from "../value-objects/ResourceParamsValue";
import {ResourceParamStack} from "../interfaces/ResourceParamStack";
import {LktObject} from "lkt-ts-interfaces";

export class LktEnvironment {
  name: ResourceNameValue;
  url: EnvironmentUrlValue;
  params: ResourceParamsValue;
  headers: LktObject;
  auth?: UserAuth;

  constructor(name: string, url: string, auth?: UserAuth, params?: ResourceParamStack, headers?: LktObject) {
    this.name = new ResourceNameValue(name);
    this.url = new EnvironmentUrlValue(url);
    this.params = new ResourceParamsValue(params);
    this.headers = typeof headers === 'undefined' ? {} : headers;
    this.auth = auth;
  }

  getParams() {
    return JSON.parse(JSON.stringify(this.params.value));
  }
}