import {ILktObject} from "lkt-tools";

import {createHTTPEnvironment} from "./functions/startup-functions";
import {LktHttpMixin} from "./mixins/LktHttpMixin";

export {existsHTTPResource} from "./functions/helpers";
export {$http} from "./functions/http-functions";
export {
    // createHTTPGetResource,
    // createHTTPPostResource,
    // createHTTPPutResource,
    // createHTTPDeleteResource,
    // createHTTPDownloadResource,
    // createHTTPOpenResource,
    createHTTPEnvironment,
    getHTTPEnvironment,
    getHTTPResource,
} from "./functions/startup-functions";

const LktHttp = {
    install: (app: any, options: ILktObject) => {
        app.mixin(LktHttpMixin);
        createHTTPEnvironment('default', '');
        //@ts-ignore
        window.download = require("downloadjs");
    },
};

export default LktHttp;