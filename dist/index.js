import { download } from './functions/download';
export { ResourceCaller } from './classes/ResourceCaller';
export { existsHTTPResource } from './functions/helpers';
export { httpCall } from './functions/http-functions';
export { debugLktHttpClient } from './functions/debug';
export { createHTTPDeleteResource, createHTTPDownloadResource, createHTTPEnvironment, createHTTPGetResource, createHTTPOpenResource, createHTTPPostResource, createHTTPPutResource, getHTTPEnvironment, getHTTPResource, } from './functions/startup-functions';
const LktHttpClient = {
    install: (app, options) => {
        //@ts-ignore
        window.download = download;
    },
};
export default LktHttpClient;
