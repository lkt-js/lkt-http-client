import { LktObject } from 'lkt-ts-interfaces';

import { getHTTPResource } from './startup-functions';

export const httpCall = (resourceName: string = '', params: LktObject = {}) => {
  const resource = getHTTPResource(resourceName);
  return resource.call(params);
};