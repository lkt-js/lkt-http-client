import { LktObject } from 'lkt-ts-interfaces';

import { createHTTPEnvironment } from './functions/startup-functions';

export { existsHTTPResource } from './functions/helpers';
export {httpCall} from "./functions/http-functions";
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
} from "./functions/startup-functions";

const LktHttp = {
    install: (app: any, options: LktObject) => {
        createHTTPEnvironment({name: 'default', url: ''});
        //@ts-ignore
        window.download = require("downloadjs");
    },
};

export default LktHttp;