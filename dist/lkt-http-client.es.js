var A = Object.defineProperty;
var x = (t, e, r) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var s = (t, e, r) => (x(t, typeof e != "symbol" ? e + "" : e, r), r);
import T from "axios";
import { successPromise as D } from "lkt-control-tools";
import { toString as V, fill as b, trim as g } from "lkt-string-tools";
import { fetchInObject as v } from "lkt-object-tools";
class y {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
}
class E {
  constructor(e) {
    s(this, "value");
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class P {
  constructor(e, r, i) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new E(e), this.url = new y(r), this.auth = i;
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
    if (this.value[e] instanceof P)
      return this.value[e];
  }
  exists(e) {
    return this.value[e] instanceof P;
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
    this.resources = new U(), this.environments = new O();
  }
}
s(c, "router"), s(c, "DEFAULT_ENVIRONMENT");
const M = (t) => {
  const e = [];
  return Object.keys(t).forEach((i) => {
    Array.isArray(t[i]) ? t[i].length > 0 && e.push(`${i}=${JSON.stringify(t[i])}`) : e.push(`${i}=${t[i]}`);
  }), e.join("&");
}, re = (t) => m().resources.exists(t), m = () => (c.router instanceof c || (c.router = new c()), c.router);
class F {
  constructor(e) {
    s(this, "value");
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class H {
  constructor(e) {
    s(this, "value");
    e || (e = "default"), this.value = e;
  }
  getUrl() {
    const e = R(this.value);
    return e ? e.url.value : "";
  }
  getAuth() {
    const e = R(this.value);
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
    return v(e, this.value);
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
    const i = Object.keys(this.value), a = r ? new window.FormData() : {};
    return i.forEach((o) => {
      const u = this.value[o].default || null;
      if (e[o] || u) {
        const f = this.value[o].renameTo || null || o;
        let n = e[o] || u;
        const h = this.value[o].type || null;
        if (h && n !== null && typeof n !== void 0)
          if (h === "string" && typeof n != "string")
            n = V(n);
          else if (h === "number" && typeof n != "number")
            n = Number(n);
          else {
            if (h === "boolean" && typeof n != "boolean")
              throw new Error(
                `Param '${o}' must be of type boolean. '${n}' received`
              );
            if (h === "array" && !Array.isArray(n))
              throw new Error(
                `Param '${o}' must be a valid array. '${n}' received`
              );
            if (h === "object" && typeof n != "object")
              throw new Error(
                `Param '${o}' must be a valid object. '${n}' received`
              );
          }
        r ? a.append(f, n) : a[f] = n;
      }
    }), a;
  }
  replaceUrlValues(e, r) {
    const i = this.prepareValues(r, !1);
    return b(
      e,
      i,
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
    return v(e, this.value);
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
  constructor(e, r, i, a, o, u) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = e, this.method = r, this.data = i, this.auth = a, this.statusValidator = o, this.headers = u;
  }
}
class K {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return v(e, this.value);
  }
}
class W {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return v(e, this.value);
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
    s(this, "maxPageDig");
    s(this, "permDig");
    s(this, "modificationsDig");
    s(this, "latestMaxPage", -1);
    s(this, "latestPerms", []);
    this.data = e, this.url = new L(e.url), this.name = new E(e.name), this.method = new C(e.method), this.environment = new H(e.environment), this.dataType = new F(e.dataType), this.params = new N(e.params), this.isFileUpload = new j(e.isFileUpload), this.validStatuses = new q(e.validStatuses), this.fetchStatus = new $(), this.onSuccess = new I(e.onSuccess), this.returnsFullResponse = new G(
      e.returnsFullResponse
    ), this.returnsResponseDig = new J(
      e.returnsResponseDig
    ), this.maxPageDig = new _(
      e.maxPageDig
    ), this.permDig = new K(
      e.permDig
    ), this.modificationsDig = new W(
      e.modificationsDig
    ), this.latestMaxPage = -1;
  }
  getLatestMaxPage() {
    return this.latestMaxPage;
  }
  getLatestPerms() {
    return this.latestPerms;
  }
  build(e) {
    let r = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const i = this.url.prepare(this.environment.getUrl());
    let a = this.params.replaceUrlValues(i, e);
    if (this.method.hasUrlParams()) {
      const l = M(r);
      l.length > 0 && (a = [a, l].join("?")), r = {};
    }
    const o = (l) => this.validStatuses.includes(l);
    let u;
    return this.isFileUpload.value && (u = {
      "Content-Type": "multipart/form-data"
    }), new B(
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
      return D();
    switch (r.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), await T(r).then((i) => {
          this.fetchStatus.stop();
          let a = this.returnsFullResponse.value ? i : i.data;
          this.maxPageDig.hasToDig() ? this.latestMaxPage = this.maxPageDig.dig(a) : this.latestMaxPage = -1, this.permDig.hasToDig() ? this.latestPerms = this.permDig.dig(a) : this.latestPerms = void 0;
          let o = {};
          return this.modificationsDig.hasToDig() && (o = this.modificationsDig.dig(a)), this.returnsResponseDig.hasToDig() && (a = this.returnsResponseDig.dig(a)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(a) : { data: a, maxPage: this.latestMaxPage, perms: this.latestPerms, modifications: o, response: i };
        }).catch((i) => (this.fetchStatus.stop(), Promise.reject(new Error(i))));
      case "download":
      case "open":
        return T.get(r.url, { responseType: "blob" }).then((i) => {
          const a = i.headers["content-disposition"];
          let o = "";
          return a && a.split(";").forEach((l) => {
            const f = l.split("=");
            if (g(f[0]) === "filename") {
              let n = g(f[1]);
              n = g(n, '"'), o = n;
            }
          }), window.download(i.data, o), this.onSuccess.hasActionDefined() ? this.onSuccess.run(i) : i;
        }).catch((i) => i);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(r)}`
        );
    }
  }
}
const ie = (t) => {
  const e = { ...t, method: "get" };
  return d(e);
}, ae = (t) => {
  const e = { ...t, method: "post" };
  return d(e);
}, ne = (t) => {
  const e = { ...t, method: "put" };
  return d(e);
}, oe = (t) => {
  const e = { ...t, method: "delete" };
  return d(e);
}, ue = (t) => {
  const e = { ...t, method: "open" };
  return d(e);
}, le = (t) => {
  const e = { ...t, method: "download" };
  return d(e);
}, d = (t) => {
  const e = new w(t);
  return m().resources.add(e), S(t.name);
}, z = (t) => {
  const e = new P(t.name, t.url, t.auth);
  return m().environments.add(e), R(t.name);
}, S = (t) => m().resources.get(t), R = (t) => m().environments.get(t), Q = async (t = "", e = {}) => await S(t).call(e);
class X {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return m().resources.exists(this.value);
  }
  async call(e) {
    return await Q(this.value, e);
  }
}
class Y {
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
class ce {
  constructor(e) {
    s(this, "resource");
    s(this, "params");
    this.resource = new X(e.resource), this.params = new Y(e.params);
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
    return this.isCallable() ? await this.resource.call(this.params.getParams()) : await D();
  }
}
const he = {
  install: (t, e) => {
    z({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  ce as ResourceCaller,
  oe as createHTTPDeleteResource,
  le as createHTTPDownloadResource,
  z as createHTTPEnvironment,
  ie as createHTTPGetResource,
  ue as createHTTPOpenResource,
  ae as createHTTPPostResource,
  ne as createHTTPPutResource,
  he as default,
  re as existsHTTPResource,
  R as getHTTPEnvironment,
  S as getHTTPResource,
  m as getRouter,
  Q as httpCall
};
