import { successPromise } from 'lkt-control-tools';
import {LktObject} from "lkt-ts-interfaces";

import { ResourceCallerConfig } from '../types/ResourceCallerConfig';
import { ResourceAliasValue } from '../value-objects/ResourceAliasValue';
import { ResourceCallDataValue } from '../value-objects/ResourceCallDataValue';

export class ResourceCaller {
  resource: ResourceAliasValue;
  params: ResourceCallDataValue;

  constructor(config: ResourceCallerConfig) {
    this.resource = new ResourceAliasValue(config.resource);
    this.params = new ResourceCallDataValue(config.params);
  }

  isCallable() {
    return this.resource.exists();
  }

  setParam(key: string, value: any) {
    this.params.setParam(key, value);
  }

  setParams(params: LktObject) {
    Object.keys(params).forEach(key => {
      this.params.setParam(key, params[key]);
    });
  }

  async call() {
    if (this.isCallable()) {
      return await this.resource.call(this.params.getParams());
    }

    return await successPromise(undefined, undefined);
  }
}