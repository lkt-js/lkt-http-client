import { ResourceParamStack } from '../interfaces/ResourceParamStack';

export class ResourceCallDataValue {
  public readonly value: ResourceParamStack;

  constructor(value?: ResourceParamStack) {
    if (!value) {
      value = {};
    }
    this.value = value;
  }

  setParam(key: string, value: any) {
    this.value[key] = value;
  }

  getParams() {
    return this.value;
  }
}