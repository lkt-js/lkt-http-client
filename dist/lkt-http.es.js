import P from "axios";
import { emptyPromise as g } from "lkt-control-tools";
import { deleteObjectProperties as N } from "lkt-object-tools";
import { extractFillData as U, fill as V, trim as E } from "lkt-string-tools";
class y {
  constructor(t) {
    t || (t = ""), this.value = t;
  }
}
class w {
  constructor(t) {
    if (t === "")
      throw new Error("A resource must have a valid name");
    this.value = t;
  }
}
class _ {
  constructor(t, s, n) {
    this.name = new w(t), this.url = new y(s), this.auth = n;
  }
}
const i = class {
  static addResource(e) {
    i.RESOURCES[e.name.value] = e;
  }
  static addEnvironment(e) {
    typeof i.DEFAULT_ENVIRONMENT > "u" && (i.DEFAULT_ENVIRONMENT = e.name.value), i.ENVIRONMENTS[e.name.value] = e;
  }
  static getEnvironment(e) {
    if (i.ENVIRONMENTS[e] instanceof _)
      return i.ENVIRONMENTS[e];
  }
};
let u = i;
u.RESOURCES = {};
u.ENVIRONMENTS = {};
u.DEFAULT_ENVIRONMENT = void 0;
u.getResource = (e) => {
  if (i.RESOURCES[e] instanceof v)
    return i.RESOURCES[e];
};
u.existsResource = (e) => i.RESOURCES[e] instanceof v;
const D = (e) => {
  const t = [];
  return Object.keys(e).forEach((n) => {
    Array.isArray(e[n]) ? e[n].length > 0 && t.push(`${n}=${JSON.stringify(e[n])}`) : t.push(`${n}=${e[n]}`);
  }), t.join("&");
}, Z = (e) => u.existsResource(e);
class l {
}
l.RESOURCE_PARAM_LEFT_SEPARATOR = "{";
l.RESOURCE_PARAM_RIGHT_SEPARATOR = "}";
class H {
  constructor(t) {
    t || (t = "json"), this.value = t;
  }
  isJSON() {
    return this.value === "json";
  }
}
class j {
  constructor(t) {
    t || (t = "default"), this.value = t;
  }
  getUrl() {
    const t = m(this.value);
    return t ? t.url.value : "";
  }
  getAuth() {
    const t = m(this.value);
    return t && t.auth ? t.auth : {};
  }
}
class b {
  constructor(t) {
    t || (t = !1), this.value = t;
  }
}
class x {
  constructor(t = !1) {
    this.value = t;
  }
  inProgress() {
    return this.value;
  }
  start() {
    this.value = !0;
  }
  stop() {
    this.value = !1;
  }
}
class C {
  constructor(t) {
    t || (t = "get"), this.value = t;
  }
  toPrimitive() {
    return this.value.toLowerCase();
  }
  isGET() {
    return this.value === "get";
  }
  isPOST() {
    return this.value === "post";
  }
  isPUT() {
    return this.value === "put";
  }
  isDELETE() {
    return this.value === "delete";
  }
  isOPEN() {
    return this.value === "open";
  }
  isDOWNLOAD() {
    return this.value === "download";
  }
  hasUrlParams() {
    return this.isGET() || this.isOPEN();
  }
}
class I {
  constructor(t) {
    t || (t = {}), this.value = t;
  }
  getDefaultValues() {
    Object.keys(this.value).forEach((s) => {
      this.value[s].default && this.value[s].default;
    });
  }
  prepareValues(t, s = !1) {
    t || (t = {});
    const n = Object.keys(this.value), r = s ? new window.FormData() : {};
    return n.forEach((o) => {
      t[o] && (s ? r.append(o, t[o]) : r[o] = t[o]);
    }), r;
  }
}
class L {
  constructor(t) {
    if (t === "")
      throw new Error("A resource must have a valid url");
    this.value = t;
  }
  prepare(t) {
    return t ? `${t}${this.value}` : this.value;
  }
}
class M {
  constructor(t) {
    typeof t != "function" && (t = void 0), this.value = t;
  }
  hasActionDefined() {
    return typeof this.value == "function";
  }
  run(t) {
    return this.value(t);
  }
}
class F {
  constructor(t) {
    t || (t = [200, 201, 202]), this.value = t;
  }
  includes(t) {
    return this.value.includes(t);
  }
}
class $ {
  constructor(t, s, n, r, o, c) {
    this.url = t, this.method = s, this.data = n, this.auth = r, this.statusValidator = o, this.headers = c;
  }
}
class v {
  constructor(t) {
    this.data = t, this.url = new L(t.url), this.name = new w(t.name), this.method = new C(t.method), this.environment = new j(t.environment), this.dataType = new H(t.dataType), this.params = new I(t.params), this.isFileUpload = new b(t.isFileUpload), this.validStatuses = new F(t.validStatuses), this.fetchStatus = new x(), this.onSuccess = new M(t.onSuccess);
  }
  build(t) {
    let s = this.params.prepareValues(
      t,
      this.isFileUpload.value
    );
    const n = this.url.prepare(this.environment.getUrl()), r = U(
      n,
      s,
      l.RESOURCE_PARAM_LEFT_SEPARATOR,
      l.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
    let o = V(
      n,
      s,
      l.RESOURCE_PARAM_LEFT_SEPARATOR,
      l.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
    if (s = N(s, r), this.method.hasUrlParams()) {
      const a = D(s);
      a.length > 0 && (o = [o, a].join("?")), s = {};
    }
    const c = (a) => this.validStatuses.includes(a);
    let p;
    return this.isFileUpload.value && (p = {
      "Content-Type": "multipart/form-data"
    }), new $(
      o,
      this.method.toPrimitive(),
      s,
      this.environment.getAuth(),
      c,
      p
    );
  }
  call(t) {
    const s = this.build(t), n = (r, o) => {
      r(void 0);
    };
    if (this.fetchStatus.inProgress())
      return g(n);
    switch (s.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), P(s).then((r) => (this.fetchStatus.stop(), this.onSuccess.hasActionDefined() ? this.onSuccess.run(r) : r)).catch((r) => (this.fetchStatus.stop(), Promise.reject(new Error(r))));
      case "download":
      case "open":
        return P.get(s.url, { responseType: "blob" }).then((r) => {
          const o = r.headers["content-disposition"];
          let c = "";
          return o && o.split(";").forEach((a) => {
            const T = a.split("=");
            if (E(T[0]) === "filename") {
              let R = E(T[1]);
              R = E(R, '"'), c = R;
            }
          }), window.download(r.data, c), this.onSuccess.hasActionDefined() ? this.onSuccess.run(r) : r;
        }).catch((r) => r);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(s)}`
        );
    }
  }
}
var G = Object.defineProperty, k = Object.defineProperties, J = Object.getOwnPropertyDescriptors, S = Object.getOwnPropertySymbols, q = Object.prototype.hasOwnProperty, B = Object.prototype.propertyIsEnumerable, O = (e, t, s) => t in e ? G(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, h = (e, t) => {
  for (var s in t || (t = {}))
    q.call(t, s) && O(e, s, t[s]);
  if (S)
    for (var s of S(t))
      B.call(t, s) && O(e, s, t[s]);
  return e;
}, d = (e, t) => k(e, J(t));
const z = (e) => {
  const t = d(h({}, e), { method: "get" });
  return f(t);
}, tt = (e) => {
  const t = d(h({}, e), { method: "post" });
  return f(t);
}, et = (e) => {
  const t = d(h({}, e), { method: "put" });
  return f(t);
}, st = (e) => {
  const t = d(h({}, e), { method: "delete" });
  return f(t);
}, rt = (e) => {
  const t = d(h({}, e), { method: "open" });
  return f(t);
}, nt = (e) => {
  const t = d(h({}, e), { method: "download" });
  return f(t);
}, f = (e) => {
  const t = new v(e);
  return u.addResource(t), A(e.name);
}, W = (e) => {
  const t = new _(e.name, e.url, e.auth);
  return u.addEnvironment(t), m(e.name);
}, A = (e) => u.getResource(e), m = (e) => u.getEnvironment(e), ot = (e = "", t = {}) => A(e).call(t), it = {
  install: (e, t) => {
    W({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  st as createHTTPDeleteResource,
  nt as createHTTPDownloadResource,
  W as createHTTPEnvironment,
  z as createHTTPGetResource,
  rt as createHTTPOpenResource,
  tt as createHTTPPostResource,
  et as createHTTPPutResource,
  it as default,
  Z as existsHTTPResource,
  m as getHTTPEnvironment,
  A as getHTTPResource,
  ot as httpCall
};
