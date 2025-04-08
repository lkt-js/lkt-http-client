import {httpCall} from '../functions/http-functions';
import {ResourceParamStack} from '../interfaces/ResourceParamStack';
import {LktRouter} from "../classes/LktRouter";

export class ResourceAliasValue {
  private readonly value: string;

  constructor(value?: string) {
    if (!value) {
      value = '';
    }
    this.value = value;
  }

  exists() {
    return LktRouter.hasResource(this.value);
  }

  async call(params: ResourceParamStack) {
    return await httpCall(this.value, params);
  }
}