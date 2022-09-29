import { getRouter } from '../functions/helpers';
import { httpCall } from '../functions/http-functions';
import { ResourceParamStack } from '../interfaces/ResourceParamStack';

export class ResourceAliasValue {
  private readonly value: string;

  constructor(value?: string) {
    if (!value) {
      value = '';
    }
    this.value = value;
  }

  exists() {
    return getRouter().resources.exists(this.value);
  }

  async call(params: ResourceParamStack) {
    return await httpCall(this.value, params);
  }
}