var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("lkt-tools"), require("axios")) : typeof define === "function" && define.amd ? define(["exports", "lkt-tools", "axios"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.LktHTTP = {}, global.LktTools, global.axios));
})(this, function(exports2, lktTools, axios) {
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios);
  const SUCCESS_STATUSES = [200, 201, 202];
  const CALL_HTTP_RESOURCE_OPTIONS = {
    forceRefresh: false
  };
  const paramsToString = (params) => {
    let r = [];
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        if (Array.isArray(params[key])) {
          if (params[key].length > 0) {
            r.push(key + "=" + JSON.stringify(params[key]));
          }
        } else {
          r.push(key + "=" + params[key]);
        }
      }
    }
    return r.join("&");
  };
  const prepareHTTPResourceOptions = (opts = {}) => {
    return lktTools.mergeObjects(CALL_HTTP_RESOURCE_OPTIONS, opts);
  };
  const getDefaultValidateStatus = (status, validStatuses = SUCCESS_STATUSES) => {
    if (validStatuses.length === 0) {
      return true;
    }
    return validStatuses.indexOf(status) !== -1;
  };
  const buildResource = (resource, args) => {
    const p = lktTools.cloneObject(resource.params);
    const method = resource.method.toLowerCase();
    let r = {};
    for (let k in p) {
      if (p.hasOwnProperty(k)) {
        r[k] = p[k].default;
      }
    }
    for (let key in args) {
      if (resource.unsafeParams || key === resource.paginationVariable || args.hasOwnProperty(key) && resource.params.hasOwnProperty(key)) {
        if (resource.renameParams.hasOwnProperty(key)) {
          delete r[key];
          r[resource.renameParams[key]] = args[key];
        } else {
          r[key] = args[key];
        }
        if (lktTools.isUndefined(r[key])) {
          delete r[key];
        }
      }
    }
    let url = resource.url;
    let env = getHTTPEnvironment(resource.environment);
    let auth = {};
    if (env && env.url) {
      url = env.url + url;
      if (!lktTools.isUndefined(env.auth) && !lktTools.isUndefined(env.auth.user)) {
        auth = env.auth;
      }
    }
    let toDelete = lktTools.extractFillData(url, r, resource.fillLeftSeparator, resource.fillRightSeparator);
    let link = lktTools.fill(url, r, resource.fillLeftSeparator, resource.fillRightSeparator);
    r = lktTools.deleteObjectKeys(r, toDelete);
    if (method === "get" || method === "open") {
      let stringParams = paramsToString(r);
      link = [link, stringParams].join("?");
      r = {};
    }
    let headers = void 0;
    if (resource.isFileUpload) {
      headers = {
        "Content-Type": "multipart/form-data"
      };
      let formData = new FormData();
      for (let k in r) {
        if (r.hasOwnProperty(k)) {
          formData.append(k, r[k]);
        }
      }
      r = formData;
    }
    return {
      url: link,
      method,
      data: r,
      auth,
      validateStatus: (status) => getDefaultValidateStatus(status, resource.validStatuses),
      headers
    };
  };
  const callHTTPResource = function(resource, params = {}) {
    const emptyResponse = (resolve, reject) => {
      resolve(void 0);
    };
    if (lktTools.isUndefined(resource)) {
      console.error("Invalid resource", resource);
      return lktTools.emptyPromise(emptyResponse);
    }
    if (resource.isFetching && !resource.enableMultipleCalling) {
      return lktTools.emptyPromise(emptyResponse);
    }
    let data = buildResource(resource, params);
    if (data.method === "get" && resource.cacheTime > 0 && !resource.forceRefreshFlag && resource.cache[data.url]) {
      let now = lktTools.time();
      let limit = resource.cache[data.url].moment + resource.cacheTime;
      if (limit - now > 0) {
        return lktTools.emptyPromise((resolve, reject) => {
          return resolve((() => {
            if (lktTools.isFunction(resource.success)) {
              return resource.success(resource.cache[data.url].r);
            }
            return resource.cache[data.url].r;
          })());
        });
      }
    }
    switch (data.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        resource.isFetching = true;
        return axios__default.default(data).then((promise) => {
          resource.isFetching = false;
          if (data.method === "get" && resource.cacheTime > 0) {
            resource.cache[data.url] = {
              moment: lktTools.time(),
              r: promise
            };
            resource.forceRefreshFlag = false;
          }
          if (lktTools.isFunction(resource.success)) {
            return resource.success(promise);
          }
          return promise;
        }).catch((error) => {
          resource.isFetching = false;
          return Promise.reject(new Error(error));
        });
      case "download":
      case "open":
        return axios__default.default.get(data.url, { "responseType": "blob" }).then((r) => {
          let contentDisposition = r.headers["content-disposition"], fileName = "";
          if (contentDisposition) {
            contentDisposition = contentDisposition.split(";");
            contentDisposition.forEach((z) => {
              let y = z.split("=");
              if (lktTools.trim(y[0]) === "filename") {
                let n = lktTools.trim(y[1]);
                n = lktTools.trim(n, '"');
                fileName = n;
              }
            });
          }
          window.download(r.data, fileName);
          if (lktTools.isFunction(resource.success)) {
            return resource.success(r);
          }
          return r;
        }).catch((error) => {
          return error;
        });
      default:
        console.warn("Error: Invalid method");
    }
  };
  class LktResource {
    constructor(name, url, method) {
      this.name = name;
      this.url = url;
      this.method = method;
      this.currentPage = void 0;
      this.isFetching = false;
      this.inLastPage = false;
      this.environment = void 0;
      this.unsafeParams = false;
      this.params = {};
      this.renameParams = {};
      this.fillLeftSeparator = "{";
      this.fillRightSeparator = "}";
      this.success = void 0;
      this.validStatuses = SUCCESS_STATUSES;
      this.searchParam = void 0;
      this.processResults = void 0;
      this.escapeMarkup = void 0;
      this.templateResult = void 0;
      this.templateSelection = void 0;
      this.paginationVariable = "paged";
      this.enableMultipleCalling = false;
      this.isFileUpload = false;
      this.lastPageChecker = () => {
        return false;
      };
      this.dataType = "json";
      this.cache = {};
      this.cacheTime = 0;
      this.escapeMarkup = void 0;
      this.templateResult = void 0;
      this.templateSelection = void 0;
      this.isFileUpload = false;
      this.cache = {};
      this.cacheTime = void 0;
      this.forceRefreshFlag = false;
    }
    setParam(property) {
      this.params[property] = { type: void 0 };
      return this;
    }
    setSuccessStatuses(statuses = SUCCESS_STATUSES) {
      this.validStatuses = statuses;
      return this;
    }
    setForceRefresh(status = true) {
      this.forceRefreshFlag = status;
      return this;
    }
    call(params = {}) {
      return callHTTPResource(this, params);
    }
  }
  class LktEnvironment {
    constructor(name, url, auth) {
      this.name = name;
      this.url = url;
      this.auth = auth;
    }
  }
  const _LktRouter = class {
    static addResource(resource) {
      _LktRouter.RESOURCES[resource.name] = resource;
    }
    static addEnvironment(environment) {
      if (lktTools.isUndefined(_LktRouter.DEFAULT_ENVIRONMENT)) {
        _LktRouter.DEFAULT_ENVIRONMENT = environment.name;
      }
      _LktRouter.ENVIRONMENTS[environment.name] = environment;
    }
    static getResource(name) {
      if (lktTools.isObject(_LktRouter.RESOURCES[name])) {
        return _LktRouter.RESOURCES[name];
      }
      return void 0;
    }
    static getEnvironment(name) {
      if (lktTools.isObject(_LktRouter.ENVIRONMENTS[name])) {
        return _LktRouter.ENVIRONMENTS[name];
      }
      return void 0;
    }
  };
  let LktRouter = _LktRouter;
  __publicField(LktRouter, "RESOURCES", []);
  __publicField(LktRouter, "ENVIRONMENTS", []);
  __publicField(LktRouter, "DEFAULT_ENVIRONMENT");
  const createHTTPResource = (name, path, method) => {
    let r = new LktResource(name, path, method);
    registerHTTPResource(r);
    return getHTTPResource(name);
  };
  const createHTTPEnvironment = (name, url, auth) => {
    let r = new LktEnvironment(name, url, auth);
    registerHTTPEnvironment(r);
    return getHTTPEnvironment(name);
  };
  const registerHTTPResource = (resource) => {
    LktRouter.addResource(resource);
  };
  const registerHTTPEnvironment = (environment) => {
    LktRouter.addEnvironment(environment);
  };
  const getHTTPResource = (resource) => {
    return LktRouter.getResource(resource);
  };
  const getHTTPEnvironment = (environment) => {
    return LktRouter.getEnvironment(environment);
  };
  const LktHttpMixin = {
    methods: {
      "$http"(resourceName = "", params = {}, options = {}) {
        const resource = getHTTPResource(resourceName);
        options = prepareHTTPResourceOptions(options);
        if (options.forceRefresh === true) {
          resource.setForceRefresh(true);
        }
        return callHTTPResource(resource, params);
      },
      "$api"(resourceName = "", params = {}, options = {}) {
        return this.$http(resourceName, params, options);
      }
    }
  };
  const LktHttp = {
    install: (app, options) => {
      app.mixin(LktHttpMixin);
    }
  };
  exports2.createHTTPEnvironment = createHTTPEnvironment;
  exports2.createHTTPResource = createHTTPResource;
  exports2.default = LktHttp;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
