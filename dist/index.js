import { createHTTPEnvironment } from './functions/startup-functions';
import { download } from "./functions/download";
export { ResourceCaller } from './classes/ResourceCaller';
export { existsHTTPResource } from './functions/helpers';
export { getRouter } from './functions/helpers';
export { httpCall } from './functions/http-functions';
export { createHTTPDeleteResource, createHTTPDownloadResource, createHTTPEnvironment, createHTTPGetResource, createHTTPOpenResource, createHTTPPostResource, createHTTPPutResource, getHTTPEnvironment, getHTTPResource, } from './functions/startup-functions';
const LktHttpClient = {
    install: (app, options) => {
        createHTTPEnvironment({ name: 'default', url: '' });
        //@ts-ignore
        window.download = download;
    },
};
export default LktHttpClient;
