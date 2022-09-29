import { LktObject } from 'lkt-ts-interfaces';

import { getHTTPResource } from './startup-functions';

export const httpCall = async (resourceName: string = '', params: LktObject = {}) => {
  const resource = getHTTPResource(resourceName);
  return await resource.call(params);
};