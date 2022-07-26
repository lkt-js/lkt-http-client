import { ILktObject } from "lkt-tools";
export { createHTTPGetResource, createHTTPPostResource, createHTTPPutResource, createHTTPDeleteResource, createHTTPDownloadResource, createHTTPOpenResource, createHTTPEnvironment } from "./functions/startup-functions";
declare const LktHttp: {
    install: (app: any, options: ILktObject) => void;
};
export default LktHttp;
