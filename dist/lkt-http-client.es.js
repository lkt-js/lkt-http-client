var D = Object.defineProperty;
var x = (t, e, r) => e in t ? D(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var s = (t, e, r) => (x(t, typeof e != "symbol" ? e + "" : e, r), r);
import P from "axios";
import { successPromise as T } from "lkt-control-tools";
import { toString as V, fill as b, trim as v } from "lkt-string-tools";
import { fetchInObject as E } from "lkt-object-tools";
class y {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
}
class S {
  constructor(e) {
    s(this, "value");
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class g {
  constructor(e, r, a) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new S(e), this.url = new y(r), this.auth = a;
  }
}
class O {
  constructor() {
    s(this, "value", {});
  }
  add(e) {
    this.value[e.name.value] = e;
  }
  get(e) {
    if (this.value[e] instanceof g)
      return this.value[e];
  }
  exists(e) {
    return this.value[e] instanceof g;
  }
}
class U {
  constructor() {
    s(this, "value", {});
  }
  add(e) {
    this.value[e.name.value] = e;
  }
  get(e) {
    if (this.value[e] instanceof R)
      return this.value[e];
  }
  exists(e) {
    return this.value[e] instanceof R;
  }
}
class c {
  constructor() {
    s(this, "resources");
    s(this, "environments");
    this.resources = new U(), this.environments = new O();
  }
}
s(c, "router"), s(c, "DEFAULT_ENVIRONMENT");
const F = (t) => {
  const e = [];
  return Object.keys(t).forEach((a) => {
    Array.isArray(t[a]) ? t[a].length > 0 && e.push(`${a}=${JSON.stringify(t[a])}`) : e.push(`${a}=${t[a]}`);
  }), e.join("&");
}, te = (t) => m().resources.exists(t), m = () => (c.router instanceof c || (c.router = new c()), c.router);
class H {
  constructor(e) {
    s(this, "value");
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class M {
  constructor(e) {
    s(this, "value");
    e || (e = "default"), this.value = e;
  }
  getUrl() {
    const e = w(this.value);
    return e ? e.url.value : "";
  }
  getAuth() {
    const e = w(this.value);
    return e && e.auth ? e.auth : {};
  }
}
class j {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class _ {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return E(e, this.value);
  }
}
class $ {
  constructor(e = !1) {
    s(this, "value");
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
class C {
  constructor(e) {
    s(this, "value");
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
class p {
}
s(p, "RESOURCE_PARAM_LEFT_SEPARATOR", "{"), s(p, "RESOURCE_PARAM_RIGHT_SEPARATOR", "}");
class N {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  prepareValues(e, r = !1) {
    e || (e = {});
    const a = Object.keys(this.value), n = r ? new window.FormData() : {};
    return a.forEach((o) => {
      const u = this.value[o].default || null;
      if (e[o] || u) {
        const f = this.value[o].renameTo || null || o;
        let i = e[o] || u;
        const h = this.value[o].type || null;
        if (h && i !== null && typeof i !== void 0)
          if (h === "string" && typeof i != "string")
            i = V(i);
          else if (h === "number" && typeof i != "number")
            i = Number(i);
          else {
            if (h === "boolean" && typeof i != "boolean")
              throw new Error(
                `Param '${o}' must be of type boolean. '${i}' received`
              );
            if (h === "array" && !Array.isArray(i))
              throw new Error(
                `Param '${o}' must be a valid array. '${i}' received`
              );
            if (h === "object" && typeof i != "object")
              throw new Error(
                `Param '${o}' must be a valid object. '${i}' received`
              );
          }
        r ? n.append(f, i) : n[f] = i;
      }
    }), n;
  }
  replaceUrlValues(e, r) {
    const a = this.prepareValues(r, !1);
    return b(
      e,
      a,
      p.RESOURCE_PARAM_LEFT_SEPARATOR,
      p.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
  }
}
class L {
  constructor(e) {
    s(this, "value");
    if (e === "")
      throw new Error("A resource must have a valid url");
    this.value = e;
  }
  prepare(e) {
    return e ? `${e}${this.value}` : this.value;
  }
}
class I {
  constructor(e) {
    s(this, "value");
    typeof e != "function" && (e = void 0), this.value = e;
  }
  hasActionDefined() {
    return typeof this.value == "function";
  }
  run(e) {
    return this.value(e);
  }
}
class G {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class J {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return E(e, this.value);
  }
}
class q {
  constructor(e) {
    s(this, "value");
    e || (e = [200, 201, 202]), this.value = e;
  }
  includes(e) {
    return this.value.includes(e);
  }
}
class B {
  constructor(e, r, a, n, o, u) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = e, this.method = r, this.data = a, this.auth = n, this.statusValidator = o, this.headers = u;
  }
}
class R {
  constructor(e) {
    s(this, "data");
    s(this, "url");
    s(this, "name");
    s(this, "method");
    s(this, "environment");
    s(this, "dataType");
    s(this, "params");
    s(this, "isFileUpload");
    s(this, "validStatuses");
    s(this, "fetchStatus");
    s(this, "onSuccess");
    s(this, "returnsFullResponse");
    s(this, "returnsResponseDig");
    s(this, "maxPageDig");
    s(this, "latestMaxPage", -1);
    this.data = e, this.url = new L(e.url), this.name = new S(e.name), this.method = new C(e.method), this.environment = new M(e.environment), this.dataType = new H(e.dataType), this.params = new N(e.params), this.isFileUpload = new j(e.isFileUpload), this.validStatuses = new q(e.validStatuses), this.fetchStatus = new $(), this.onSuccess = new I(e.onSuccess), this.returnsFullResponse = new G(
      e.returnsFullResponse
    ), this.returnsResponseDig = new J(
      e.returnsResponseDig
    ), this.maxPageDig = new _(
      e.maxPageDig
    ), this.latestMaxPage = -1;
  }
  getLatestMaxPage() {
    return this.latestMaxPage;
  }
  build(e) {
    let r = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const a = this.url.prepare(this.environment.getUrl());
    let n = this.params.replaceUrlValues(a, e);
    if (this.method.hasUrlParams()) {
      const l = F(r);
      l.length > 0 && (n = [n, l].join("?")), r = {};
    }
    const o = (l) => this.validStatuses.includes(l);
    let u;
    return this.isFileUpload.value && (u = {
      "Content-Type": "multipart/form-data"
    }), new B(
      n,
      this.method.toPrimitive(),
      r,
      this.environment.getAuth(),
      o,
      u
    );
  }
  async call(e) {
    const r = this.build(e);
    if (this.fetchStatus.inProgress())
      return T();
    switch (r.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), await P(r).then((a) => {
          this.fetchStatus.stop();
          let n = this.returnsFullResponse.value ? a : a.data;
          return this.maxPageDig.hasToDig() ? this.latestMaxPage = this.maxPageDig.dig(n) : this.latestMaxPage = -1, this.returnsResponseDig.hasToDig() && (n = this.returnsResponseDig.dig(n)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(n) : n;
        }).catch((a) => (this.fetchStatus.stop(), Promise.reject(new Error(a))));
      case "download":
      case "open":
        return P.get(r.url, { responseType: "blob" }).then((a) => {
          const n = a.headers["content-disposition"];
          let o = "";
          return n && n.split(";").forEach((l) => {
            const f = l.split("=");
            if (v(f[0]) === "filename") {
              let i = v(f[1]);
              i = v(i, '"'), o = i;
            }
          }), window.download(a.data, o), this.onSuccess.hasActionDefined() ? this.onSuccess.run(a) : a;
        }).catch((a) => a);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(r)}`
        );
    }
  }
}
const se = (t) => {
  const e = { ...t, method: "get" };
  return d(e);
}, re = (t) => {
  const e = { ...t, method: "post" };
  return d(e);
}, ae = (t) => {
  const e = { ...t, method: "put" };
  return d(e);
}, ie = (t) => {
  const e = { ...t, method: "delete" };
  return d(e);
}, ne = (t) => {
  const e = { ...t, method: "open" };
  return d(e);
}, oe = (t) => {
  const e = { ...t, method: "download" };
  return d(e);
}, d = (t) => {
  const e = new R(t);
  return m().resources.add(e), A(t.name);
}, K = (t) => {
  const e = new g(t.name, t.url, t.auth);
  return m().environments.add(e), w(t.name);
}, A = (t) => m().resources.get(t), w = (t) => m().environments.get(t), W = async (t = "", e = {}) => await A(t).call(e);
class z {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return m().resources.exists(this.value);
  }
  async call(e) {
    return await W(this.value, e);
  }
}
class Q {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  setParam(e, r) {
    this.value[e] = r;
  }
  getParams() {
    return this.value;
  }
}
class ue {
  constructor(e) {
    s(this, "resource");
    s(this, "params");
    this.resource = new z(e.resource), this.params = new Q(e.params);
  }
  isCallable() {
    return this.resource.exists();
  }
  setParam(e, r) {
    this.params.setParam(e, r);
  }
  setParams(e) {
    Object.keys(e).forEach((r) => {
      this.params.setParam(r, e[r]);
    });
  }
  async call() {
    return this.isCallable() ? await this.resource.call(this.params.getParams()) : await T();
  }
}
const le = {
  install: (t, e) => {
    K({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  ue as ResourceCaller,
  ie as createHTTPDeleteResource,
  oe as createHTTPDownloadResource,
  K as createHTTPEnvironment,
  se as createHTTPGetResource,
  ne as createHTTPOpenResource,
  re as createHTTPPostResource,
  ae as createHTTPPutResource,
  le as default,
  te as existsHTTPResource,
  w as getHTTPEnvironment,
  A as getHTTPResource,
  m as getRouter,
  W as httpCall
};
