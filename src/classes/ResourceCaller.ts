import { emptyPromise } from 'lkt-control-tools';

import { ResourceCallerConfig } from '../types/ResourceCallerConfig';
import { ResourceAliasValue } from '../value-objects/ResourceAliasValue';
import { ResourceCallDataValue } from '../value-objects/ResourceCallDataValue';

export class ResourceCaller {
  resource: ResourceAliasValue;
  params?: ResourceCallDataValue;

  constructor(config: ResourceCallerConfig) {
    this.resource = new ResourceAliasValue(config.resource);
    this.params = new ResourceCallDataValue(config.params);
  }

  isCallable() {
    return this.resource.exists();
  }

  call() {
    if (this.isCallable()) {
      return this.resource.call(this.params.getParams());
    }

    return emptyPromise();
  }
}