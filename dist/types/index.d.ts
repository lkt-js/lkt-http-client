import { ILktObject } from "lkt-tools";
export { createHTTPGetResource, createHTTPPostResource, createHTTPPutResource, createHTTPDeleteResource, createHTTPDownloadResource, createHTTPOpenResource, createHTTPEnvironment, getHTTPResource, getHTTPEnvironment, } from "./functions/startup-functions";
export { $http } from "./functions/http-functions";
export { existsHTTPResource } from "./functions/helpers";
declare const LktHttp: {
    install: (app: any, options: ILktObject) => void;
};
export default LktHttp;
