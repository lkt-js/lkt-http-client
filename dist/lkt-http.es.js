import { isUndefined as R, isObject as _, mergeObjects as v, emptyPromise as O, time as g, isFunction as S, trim as P, cloneObject as D, extractFillData as U, fill as y, deleteObjectKeys as M } from "lkt-tools";
import N from "axios";
const p = [200, 201, 202], L = {
  forceRefresh: !1
}, C = "get", I = "post", j = "put", k = "delete", x = "open", b = "download";
class V {
  constructor(e, n, r = "get") {
    this.method = "get", this.dataType = "json", this.currentPage = -1, this.params = {}, this.renameParams = {}, this.environment = "", this.isFetching = !1, this.isFileUpload = !1, this.forceRefreshFlag = !1, this.unsafeParams = !1, this.onSuccess = void 0, this.validStatuses = p, this.cacheTime = 0, this.cache = {}, this.name = e, this.url = n, this.method = r;
  }
  setEnvironment(e) {
    return this.environment = e, this;
  }
  setDataTypeJSON() {
    return this.dataType = "json", this;
  }
  enableUnsafeParams() {
    return this.unsafeParams = !0, this;
  }
  setIsFileUpload(e = !0) {
    return this.isFileUpload = e, this;
  }
  setParam(e) {
    return this.params[e] = { type: void 0 }, this;
  }
  renameParam(e, n) {
    return this.params[e] = n, this;
  }
  setSuccessStatuses(e = p) {
    return this.validStatuses = e, this;
  }
  setForceRefresh(e = !0) {
    return this.forceRefreshFlag = e, this;
  }
  setOnSuccess(e) {
    return this.onSuccess = e, this;
  }
  call(e = {}) {
    return F(this, e);
  }
}
class G {
  constructor(e, n, r) {
    this.name = e, this.url = n, this.auth = r;
  }
}
const c = class {
  static addResource(t) {
    c.RESOURCES[t.name] = t;
  }
  static addEnvironment(t) {
    R(c.DEFAULT_ENVIRONMENT) && (c.DEFAULT_ENVIRONMENT = t.name), c.ENVIRONMENTS[t.name] = t;
  }
  static getResource(t) {
    if (_(c.RESOURCES[t]))
      return c.RESOURCES[t];
  }
  static getEnvironment(t) {
    if (_(c.ENVIRONMENTS[t]))
      return c.ENVIRONMENTS[t];
  }
};
let l = c;
l.RESOURCES = {};
l.ENVIRONMENTS = {};
l.DEFAULT_ENVIRONMENT = void 0;
const X = (t, e, n = "default") => d(t, e, C, n), Y = (t, e, n = "default") => d(t, e, I, n), Z = (t, e, n = "default") => d(t, e, j, n), tt = (t, e, n = "default") => d(t, e, k, n), et = (t, e, n = "default") => d(t, e, x, n), nt = (t, e, n = "default") => d(t, e, b, n), d = (t, e, n = "get", r = "default") => {
  let s = new V(t, e, n).setEnvironment(r);
  return l.addResource(s), A(t);
}, $ = (t, e, n = {}) => {
  let r = new G(t, e, n);
  return l.addEnvironment(r), w(t);
}, A = (t) => l.getResource(t), w = (t) => l.getEnvironment(t), J = (t) => {
  let e = [];
  for (let n in t)
    t.hasOwnProperty(n) && (Array.isArray(t[n]) ? t[n].length > 0 && e.push(n + "=" + JSON.stringify(t[n])) : e.push(n + "=" + t[n]));
  return e.join("&");
}, q = (t = {}) => v(L, t), st = (t) => !R(A(t));
class f {
}
f.RESOURCE_PARAM_LEFT_SEPARATOR = "{";
f.RESOURCE_PARAM_RIGHT_SEPARATOR = "}";
const K = (t, e = p) => e.length === 0 ? !0 : e.indexOf(t) !== -1, W = (t, e) => {
  const n = D(t.params), r = t.method.toLowerCase();
  let s = {};
  for (let i in n)
    n.hasOwnProperty(i) && (s[i] = n[i].default);
  for (let i in e)
    (t.unsafeParams || e.hasOwnProperty(i) && t.params.hasOwnProperty(i)) && (t.renameParams.hasOwnProperty(i) ? (delete s[i], s[t.renameParams[i]] = e[i]) : s[i] = e[i], R(s[i]) && delete s[i]);
  let o = t.url, a = w(t.environment), E = {};
  a && a.url && (o = a.url + o, !R(a.auth) && !R(a.auth.user) && (E = a.auth));
  let T = U(o, s, f.RESOURCE_PARAM_LEFT_SEPARATOR, f.RESOURCE_PARAM_RIGHT_SEPARATOR), u = y(o, s, f.RESOURCE_PARAM_LEFT_SEPARATOR, f.RESOURCE_PARAM_RIGHT_SEPARATOR);
  if (s = M(s, T), r === "get" || r === "open") {
    let i = J(s);
    u = [u, i].join("?"), s = {};
  }
  let h;
  if (t.isFileUpload) {
    h = {
      "Content-Type": "multipart/form-data"
    };
    let i = new FormData();
    for (let m in s)
      s.hasOwnProperty(m) && i.append(m, s[m]);
    s = i;
  }
  return {
    url: u,
    method: r,
    data: s,
    auth: E,
    validateStatus: (i) => K(i, t.validStatuses),
    headers: h
  };
}, F = function(t, e = {}) {
  const n = (s, o) => {
    s(void 0);
  };
  if (R(t))
    return console.error("Invalid resource", t), O(n);
  if (t.isFetching)
    return O(n);
  let r = W(t, e);
  if (r.method === "get" && t.cacheTime > 0 && !t.forceRefreshFlag && t.cache[r.url]) {
    let s = g();
    if (t.cache[r.url].moment + t.cacheTime - s > 0)
      return O((a, E) => a((() => S(t.onSuccess) ? t.onSuccess(t.cache[r.url].r) : t.cache[r.url].r)()));
  }
  switch (r.method) {
    case "get":
    case "post":
    case "put":
    case "delete":
      return t.isFetching = !0, N(r).then((s) => (t.isFetching = !1, r.method === "get" && t.cacheTime > 0 && (t.cache[r.url] = {
        moment: g(),
        r: s
      }, t.forceRefreshFlag = !1), S(t.onSuccess) ? t.onSuccess(s) : s)).catch((s) => (t.isFetching = !1, Promise.reject(new Error(s))));
    case "download":
    case "open":
      return N.get(r.url, { responseType: "blob" }).then((s) => {
        let o = s.headers["content-disposition"], a = "";
        return o && o.split(";").forEach((T) => {
          let u = T.split("=");
          if (P(u[0]) === "filename") {
            let h = P(u[1]);
            h = P(h, '"'), a = h;
          }
        }), window.download(s.data, a), S(t.onSuccess) ? t.onSuccess(s) : s;
      }).catch((s) => s);
    default:
      console.warn("Error: Invalid method");
  }
}, H = (t = "", e = {}, n = {}) => {
  const r = A(t);
  return n = q(n), n.forceRefresh === !0 && r.setForceRefresh(!0), F(r, e);
}, z = {
  methods: {
    $http(t = "", e = {}, n = {}) {
      return H(t, e, n);
    },
    $api(t = "", e = {}, n = {}) {
      return H(t, e, n);
    }
  }
}, rt = {
  install: (t, e) => {
    t.mixin(z), $("default", ""), window.download = require("downloadjs");
  }
};
export {
  H as $http,
  tt as createHTTPDeleteResource,
  nt as createHTTPDownloadResource,
  $ as createHTTPEnvironment,
  X as createHTTPGetResource,
  et as createHTTPOpenResource,
  Y as createHTTPPostResource,
  Z as createHTTPPutResource,
  rt as default,
  st as existsHTTPResource,
  w as getHTTPEnvironment,
  A as getHTTPResource
};
