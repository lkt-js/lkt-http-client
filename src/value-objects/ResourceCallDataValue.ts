import { ResourceParamStack } from '../interfaces/ResourceParamStack';

export class ResourceCallDataValue {
  public readonly value: ResourceParamStack;

  constructor(value?: ResourceParamStack) {
    if (!value) {
      value = {};
    }
    this.value = value;
  }

  getParams() {
    return this.value;
  }
}