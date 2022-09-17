import { LktObject } from 'lkt-ts-interfaces';

import { ResourceParamStack } from '../interfaces/ResourceParamStack';

export class ResourceParamsValue {
  public readonly value: ResourceParamStack;

  constructor(value?: ResourceParamStack) {
    if (!value) {
      value = {};
    }
    this.value = value;
  }

  private getDefaultValues() {
    const keys = Object.keys(this.value);
    const r: LktObject = {};
    keys.forEach((z) => {
      if (this.value[z].default) {
        r[z] = this.value[z].default;
      }
    });
  }

  prepareValues(values?: LktObject, asFormData: boolean = false) {
    if (!values) {
      values = {};
    }

    const keys = Object.keys(this.value);
    //@ts-ignore
    const r: LktObject = asFormData ? new window.FormData() : {};

    keys.forEach((key) => {
      if (values[key]) {
        if (asFormData) {
          r.append(key, values[key]);
        } else {
          r[key] = values[key];
        }
      }
    });

    return r;
  }
}