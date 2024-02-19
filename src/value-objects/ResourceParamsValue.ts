import { fill, toString } from 'lkt-string-tools';
import { LktObject } from 'lkt-ts-interfaces';

import { ResourceParamStack } from '../interfaces/ResourceParamStack';
import { Settings } from '../settings/Settings';

export class ResourceParamsValue {
  public readonly value: ResourceParamStack;

  constructor(value?: ResourceParamStack) {
    if (!value) {
      value = {};
    }
    this.value = value;
  }

  prepareValues(values?: LktObject, asFormData: boolean = false) {
    if (typeof values === 'undefined') {
      values = {};
    }

    let _Values: LktObject = values;

    const keys = Object.keys(this.value);
    //@ts-ignore
    const r: LktObject = asFormData ? new window.FormData() : {};

    keys.forEach((key) => {
      const defaultValue = this.value[key].default || null;
      if (_Values[key] || defaultValue) {
        const rename = this.value[key].renameTo || null;
        const storeKey = rename || key;
        let value = defaultValue;
        if (typeof _Values[key] !== 'undefined') {
          value = _Values[key];
        }
        const type = this.value[key].type || null;

        if (type && value !== null && typeof value !== undefined) {
          if (type === 'string' && typeof value !== 'string') {
            value = toString(value);
          } else if (type === 'number' && typeof value !== 'number') {
            value = Number(value);
          } else if (type === 'boolean' && typeof value !== 'boolean') {
            throw new Error(
              `Param '${key}' must be of type boolean. '${value}' received`
            );
          } else if (type === 'array' && !Array.isArray(value)) {
            throw new Error(
              `Param '${key}' must be a valid array. '${value}' received`
            );
          } else if (type === 'object' && typeof value !== 'object') {
            throw new Error(
              `Param '${key}' must be a valid object. '${value}' received`
            );
          }
        }

        if (asFormData) {
          r.append(storeKey, value);
        } else {
          r[storeKey] = value;
        }
      }
    });

    return r;
  }

  replaceUrlValues(url: string, values?: LktObject) {
    const data = this.prepareValues(values, false);
    return fill(
      url,
      data,
      Settings.RESOURCE_PARAM_LEFT_SEPARATOR,
      Settings.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
  }
}
