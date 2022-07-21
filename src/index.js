import {LktHttpMixin} from "./mixins/LktHttpMixin";

export {
    createHTTPResource,
    createHTTPEnvironment,
    registerHTTPEnvironment,
    registerHTTPResource
} from "./functions/startup-functions";

const LktHttp = {
    install: (app, options) => {
        app.mixin(LktHttpMixin);
    },
};

export default LktHttp;