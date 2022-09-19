import { LktObject } from 'lkt-ts-interfaces';
export { existsHTTPResource } from './functions/helpers';
export { httpCall } from "./functions/http-functions";
export { createHTTPDeleteResource, createHTTPDownloadResource, createHTTPEnvironment, createHTTPGetResource, createHTTPOpenResource, createHTTPPostResource, createHTTPPutResource, getHTTPEnvironment, getHTTPResource, } from "./functions/startup-functions";
declare const LktHttp: {
    install: (app: any, options: LktObject) => void;
};
export default LktHttp;
