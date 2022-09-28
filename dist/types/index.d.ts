import { LktObject } from 'lkt-ts-interfaces';
export { ResourceCaller } from './classes/ResourceCaller';
export { existsHTTPResource } from './functions/helpers';
export { httpCall } from './functions/http-functions';
export { createHTTPDeleteResource, createHTTPDownloadResource, createHTTPEnvironment, createHTTPGetResource, createHTTPOpenResource, createHTTPPostResource, createHTTPPutResource, getHTTPEnvironment, getHTTPResource, } from './functions/startup-functions';
export type { ResourceCallerConfig } from './types/ResourceCallerConfig';
declare const LktHttp: {
    install: (app: any, options: LktObject) => void;
};
export default LktHttp;
