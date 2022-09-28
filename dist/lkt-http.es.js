import T from "axios";
import { emptyPromise as O } from "lkt-control-tools";
import { toString as N, fill as V, trim as E } from "lkt-string-tools";
import { fetchInObject as b } from "lkt-object-tools";
class y {
  constructor(e) {
    e || (e = ""), this.value = e;
  }
}
class g {
  constructor(e) {
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class A {
  constructor(e, s, i) {
    this.name = new g(e), this.url = new y(s), this.auth = i;
  }
}
const l = class {
  static addResource(t) {
    l.RESOURCES[t.name.value] = t;
  }
  static addEnvironment(t) {
    typeof l.DEFAULT_ENVIRONMENT > "u" && (l.DEFAULT_ENVIRONMENT = t.name.value), l.ENVIRONMENTS[t.name.value] = t;
  }
  static getEnvironment(t) {
    if (l.ENVIRONMENTS[t] instanceof A)
      return l.ENVIRONMENTS[t];
  }
};
let u = l;
u.RESOURCES = {};
u.ENVIRONMENTS = {};
u.DEFAULT_ENVIRONMENT = void 0;
u.getResource = (t) => {
  if (l.RESOURCES[t] instanceof w)
    return l.RESOURCES[t];
};
u.existsResource = (t) => l.RESOURCES[t] instanceof w;
const U = (t) => {
  const e = [];
  return Object.keys(t).forEach((i) => {
    Array.isArray(t[i]) ? t[i].length > 0 && e.push(`${i}=${JSON.stringify(t[i])}`) : e.push(`${i}=${t[i]}`);
  }), e.join("&");
}, re = (t) => u.existsResource(t);
class D {
  constructor(e) {
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class j {
  constructor(e) {
    e || (e = "default"), this.value = e;
  }
  getUrl() {
    const e = v(this.value);
    return e ? e.url.value : "";
  }
  getAuth() {
    const e = v(this.value);
    return e && e.auth ? e.auth : {};
  }
}
class x {
  constructor(e) {
    e || (e = !1), this.value = e;
  }
}
class C {
  constructor(e = !1) {
    this.value = e;
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
class F {
  constructor(e) {
    e || (e = "get"), this.value = e;
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
class R {
}
R.RESOURCE_PARAM_LEFT_SEPARATOR = "{";
R.RESOURCE_PARAM_RIGHT_SEPARATOR = "}";
class H {
  constructor(e) {
    e || (e = {}), this.value = e;
  }
  prepareValues(e, s = !1) {
    e || (e = {});
    const i = Object.keys(this.value), r = s ? new window.FormData() : {};
    return i.forEach((n) => {
      const a = this.value[n].default || null;
      if (e[n] || a) {
        const m = this.value[n].renameTo || null || n;
        let o = e[n] || a;
        const c = this.value[n].type || null;
        if (c && o !== null && typeof o !== void 0)
          if (c === "string" && typeof o != "string")
            o = N(o);
          else if (c === "number" && typeof o != "number")
            o = Number(o);
          else {
            if (c === "boolean" && typeof o != "boolean")
              throw new Error(
                `Param '${n}' must be of type boolean. '${o}' received`
              );
            if (c === "array" && !Array.isArray(o))
              throw new Error(
                `Param '${n}' must be a valid array. '${o}' received`
              );
            if (c === "object" && typeof o != "object")
              throw new Error(
                `Param '${n}' must be a valid object. '${o}' received`
              );
          }
        s ? r.append(m, o) : r[m] = o;
      }
    }), r;
  }
  replaceUrlValues(e, s) {
    const i = this.prepareValues(s, !1);
    return V(
      e,
      i,
      R.RESOURCE_PARAM_LEFT_SEPARATOR,
      R.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
  }
}
class I {
  constructor(e) {
    if (e === "")
      throw new Error("A resource must have a valid url");
    this.value = e;
  }
  prepare(e) {
    return e ? `${e}${this.value}` : this.value;
  }
}
class L {
  constructor(e) {
    typeof e != "function" && (e = void 0), this.value = e;
  }
  hasActionDefined() {
    return typeof this.value == "function";
  }
  run(e) {
    return this.value(e);
  }
}
class $ {
  constructor(e) {
    e || (e = !1), this.value = e;
  }
}
class M {
  constructor(e) {
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return b(e, this.value);
  }
}
class G {
  constructor(e) {
    e || (e = [200, 201, 202]), this.value = e;
  }
  includes(e) {
    return this.value.includes(e);
  }
}
class J {
  constructor(e, s, i, r, n, a) {
    this.url = e, this.method = s, this.data = i, this.auth = r, this.statusValidator = n, this.headers = a;
  }
}
class w {
  constructor(e) {
    this.data = e, this.url = new I(e.url), this.name = new g(e.name), this.method = new F(e.method), this.environment = new j(e.environment), this.dataType = new D(e.dataType), this.params = new H(e.params), this.isFileUpload = new x(e.isFileUpload), this.validStatuses = new G(e.validStatuses), this.fetchStatus = new C(), this.onSuccess = new L(e.onSuccess), this.returnsFullResponse = new $(e.returnsFullResponse), this.returnsResponseDig = new M(e.returnsResponseDig);
  }
  build(e) {
    let s = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const i = this.url.prepare(this.environment.getUrl());
    let r = this.params.replaceUrlValues(i, e);
    if (this.method.hasUrlParams()) {
      const h = U(s);
      h.length > 0 && (r = [r, h].join("?")), s = {};
    }
    const n = (h) => this.validStatuses.includes(h);
    let a;
    return this.isFileUpload.value && (a = {
      "Content-Type": "multipart/form-data"
    }), new J(
      r,
      this.method.toPrimitive(),
      s,
      this.environment.getAuth(),
      n,
      a
    );
  }
  call(e) {
    const s = this.build(e), i = (r, n) => {
      r(void 0);
    };
    if (this.fetchStatus.inProgress())
      return O(i);
    switch (s.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), T(s).then((r) => {
          this.fetchStatus.stop();
          let n = this.returnsFullResponse.value ? r : r.data;
          return this.returnsResponseDig.hasToDig() && (n = this.returnsResponseDig.dig(n)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(n) : n;
        }).catch((r) => (this.fetchStatus.stop(), Promise.reject(new Error(r))));
      case "download":
      case "open":
        return T.get(s.url, { responseType: "blob" }).then((r) => {
          const n = r.headers["content-disposition"];
          let a = "";
          return n && n.split(";").forEach((m) => {
            const o = m.split("=");
            if (E(o[0]) === "filename") {
              let c = E(o[1]);
              c = E(c, '"'), a = c;
            }
          }), window.download(r.data, a), this.onSuccess.hasActionDefined() ? this.onSuccess.run(r) : r;
        }).catch((r) => r);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(s)}`
        );
    }
  }
}
var q = Object.defineProperty, B = Object.defineProperties, K = Object.getOwnPropertyDescriptors, P = Object.getOwnPropertySymbols, W = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable, S = (t, e, s) => e in t ? q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, p = (t, e) => {
  for (var s in e || (e = {}))
    W.call(e, s) && S(t, s, e[s]);
  if (P)
    for (var s of P(e))
      z.call(e, s) && S(t, s, e[s]);
  return t;
}, f = (t, e) => B(t, K(e));
const ne = (t) => {
  const e = f(p({}, t), { method: "get" });
  return d(e);
}, oe = (t) => {
  const e = f(p({}, t), { method: "post" });
  return d(e);
}, ie = (t) => {
  const e = f(p({}, t), { method: "put" });
  return d(e);
}, ue = (t) => {
  const e = f(p({}, t), { method: "delete" });
  return d(e);
}, ae = (t) => {
  const e = f(p({}, t), { method: "open" });
  return d(e);
}, ce = (t) => {
  const e = f(p({}, t), { method: "download" });
  return d(e);
}, d = (t) => {
  const e = new w(t);
  return u.addResource(e), _(t.name);
}, Q = (t) => {
  const e = new A(t.name, t.url, t.auth);
  return u.addEnvironment(e), v(t.name);
}, _ = (t) => u.getResource(t), v = (t) => u.getEnvironment(t), X = (t = "", e = {}) => _(t).call(e);
class Y {
  constructor(e) {
    e || (e = ""), this.value = e;
  }
  exists() {
    return u.existsResource(this.value);
  }
  call(e) {
    return X(this.value, e);
  }
}
class Z {
  constructor(e) {
    e || (e = {}), this.value = e;
  }
  getParams() {
    return this.value;
  }
}
class le {
  constructor(e) {
    this.resource = new Y(e.resource), this.params = new Z(e.params);
  }
  isCallable() {
    return this.resource.exists();
  }
  call() {
    return this.isCallable() ? this.resource.call(this.params.getParams()) : O();
  }
}
const he = {
  install: (t, e) => {
    Q({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  le as ResourceCaller,
  ue as createHTTPDeleteResource,
  ce as createHTTPDownloadResource,
  Q as createHTTPEnvironment,
  ne as createHTTPGetResource,
  ae as createHTTPOpenResource,
  oe as createHTTPPostResource,
  ie as createHTTPPutResource,
  he as default,
  re as existsHTTPResource,
  v as getHTTPEnvironment,
  _ as getHTTPResource,
  X as httpCall
};
