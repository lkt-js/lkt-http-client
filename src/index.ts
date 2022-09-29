import { LktObject } from 'lkt-ts-interfaces';

import { createHTTPEnvironment } from './functions/startup-functions';

export { ResourceCaller } from './classes/ResourceCaller';
export { existsHTTPResource } from './functions/helpers';
export { getRouter } from './functions/helpers';
export { httpCall } from './functions/http-functions';
export {
  createHTTPDeleteResource,
  createHTTPDownloadResource,
  createHTTPEnvironment,
  createHTTPGetResource,
  createHTTPOpenResource,
  createHTTPPostResource,
  createHTTPPutResource,
  getHTTPEnvironment,
  getHTTPResource,
} from './functions/startup-functions';
export type { ResourceCallerConfig } from './types/ResourceCallerConfig';

const LktHttp = {
  install: (app: any, options: LktObject) => {
    createHTTPEnvironment({ name: 'default', url: '' });
    //@ts-ignore
    window.download = require('downloadjs');
  },
};

export default LktHttp;
