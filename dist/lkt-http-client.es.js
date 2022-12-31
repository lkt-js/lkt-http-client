var A = Object.defineProperty;
var V = (t, e, r) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var s = (t, e, r) => (V(t, typeof e != "symbol" ? e + "" : e, r), r);
import P from "axios";
import { successPromise as E } from "lkt-control-tools";
import { toString as b, fill as y, trim as v } from "lkt-string-tools";
import { fetchInObject as D } from "lkt-object-tools";
class O {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
}
class g {
  constructor(e) {
    s(this, "value");
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class R {
  constructor(e, r, n) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new g(e), this.url = new O(r), this.auth = n;
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
class x {
  constructor() {
    s(this, "value", {});
  }
  add(e) {
    this.value[e.name.value] = e;
  }
  get(e) {
    if (this.value[e] instanceof w)
      return this.value[e];
  }
  exists(e) {
    return this.value[e] instanceof w;
  }
}
class c {
  constructor() {
    s(this, "resources");
    s(this, "environments");
    this.resources = new x(), this.environments = new U();
  }
}
s(c, "router"), s(c, "DEFAULT_ENVIRONMENT");
const F = (t) => {
  const e = [];
  return Object.keys(t).forEach((n) => {
    Array.isArray(t[n]) ? t[n].length > 0 && e.push(`${n}=${JSON.stringify(t[n])}`) : e.push(`${n}=${t[n]}`);
  }), e.join("&");
}, ee = (t) => m().resources.exists(t), m = () => (c.router instanceof c || (c.router = new c()), c.router);
class H {
  constructor(e) {
    s(this, "value");
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class j {
  constructor(e) {
    s(this, "value");
    e || (e = "default"), this.value = e;
  }
  getUrl() {
    const e = T(this.value);
    return e ? e.url.value : "";
  }
  getAuth() {
    const e = T(this.value);
    return e && e.auth ? e.auth : {};
  }
}
class _ {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
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
class N {
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
class C {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  prepareValues(e, r = !1) {
    e || (e = {});
    const n = Object.keys(this.value), a = r ? new window.FormData() : {};
    return n.forEach((o) => {
      const u = this.value[o].default || null;
      if (e[o] || u) {
        const f = this.value[o].renameTo || null || o;
        let i = e[o] || u;
        const h = this.value[o].type || null;
        if (h && i !== null && typeof i !== void 0)
          if (h === "string" && typeof i != "string")
            i = b(i);
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
        r ? a.append(f, i) : a[f] = i;
      }
    }), a;
  }
  replaceUrlValues(e, r) {
    const n = this.prepareValues(r, !1);
    return y(
      e,
      n,
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
class M {
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
class I {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class G {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return D(e, this.value);
  }
}
class J {
  constructor(e) {
    s(this, "value");
    e || (e = [200, 201, 202]), this.value = e;
  }
  includes(e) {
    return this.value.includes(e);
  }
}
class q {
  constructor(e, r, n, a, o, u) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = e, this.method = r, this.data = n, this.auth = a, this.statusValidator = o, this.headers = u;
  }
}
class w {
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
    this.data = e, this.url = new L(e.url), this.name = new g(e.name), this.method = new N(e.method), this.environment = new j(e.environment), this.dataType = new H(e.dataType), this.params = new C(e.params), this.isFileUpload = new _(e.isFileUpload), this.validStatuses = new J(e.validStatuses), this.fetchStatus = new $(), this.onSuccess = new M(e.onSuccess), this.returnsFullResponse = new I(
      e.returnsFullResponse
    ), this.returnsResponseDig = new G(
      e.returnsResponseDig
    );
  }
  build(e) {
    let r = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const n = this.url.prepare(this.environment.getUrl());
    let a = this.params.replaceUrlValues(n, e);
    if (this.method.hasUrlParams()) {
      const l = F(r);
      l.length > 0 && (a = [a, l].join("?")), r = {};
    }
    const o = (l) => this.validStatuses.includes(l);
    let u;
    return this.isFileUpload.value && (u = {
      "Content-Type": "multipart/form-data"
    }), new q(
      a,
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
      return E();
    switch (r.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), await P(r).then((n) => {
          this.fetchStatus.stop();
          let a = this.returnsFullResponse.value ? n : n.data;
          return this.returnsResponseDig.hasToDig() && (a = this.returnsResponseDig.dig(a)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(a) : a;
        }).catch((n) => (this.fetchStatus.stop(), Promise.reject(new Error(n))));
      case "download":
      case "open":
        return P.get(r.url, { responseType: "blob" }).then((n) => {
          const a = n.headers["content-disposition"];
          let o = "";
          return a && a.split(";").forEach((l) => {
            const f = l.split("=");
            if (v(f[0]) === "filename") {
              let i = v(f[1]);
              i = v(i, '"'), o = i;
            }
          }), window.download(n.data, o), this.onSuccess.hasActionDefined() ? this.onSuccess.run(n) : n;
        }).catch((n) => n);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(r)}`
        );
    }
  }
}
const te = (t) => {
  const e = { ...t, method: "get" };
  return d(e);
}, se = (t) => {
  const e = { ...t, method: "post" };
  return d(e);
}, re = (t) => {
  const e = { ...t, method: "put" };
  return d(e);
}, ne = (t) => {
  const e = { ...t, method: "delete" };
  return d(e);
}, ie = (t) => {
  const e = { ...t, method: "open" };
  return d(e);
}, ae = (t) => {
  const e = { ...t, method: "download" };
  return d(e);
}, d = (t) => {
  const e = new w(t);
  return m().resources.add(e), S(t.name);
}, B = (t) => {
  const e = new R(t.name, t.url, t.auth);
  return m().environments.add(e), T(t.name);
}, S = (t) => m().resources.get(t), T = (t) => m().environments.get(t), K = async (t = "", e = {}) => await S(t).call(e);
class W {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return m().resources.exists(this.value);
  }
  async call(e) {
    return await K(this.value, e);
  }
}
class z {
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
class oe {
  constructor(e) {
    s(this, "resource");
    s(this, "params");
    this.resource = new W(e.resource), this.params = new z(e.params);
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
    return this.isCallable() ? await this.resource.call(this.params.getParams()) : await E();
  }
}
const ue = {
  install: (t, e) => {
    B({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  oe as ResourceCaller,
  ne as createHTTPDeleteResource,
  ae as createHTTPDownloadResource,
  B as createHTTPEnvironment,
  te as createHTTPGetResource,
  ie as createHTTPOpenResource,
  se as createHTTPPostResource,
  re as createHTTPPutResource,
  ue as default,
  ee as existsHTTPResource,
  T as getHTTPEnvironment,
  S as getHTTPResource,
  m as getRouter,
  K as httpCall
};
