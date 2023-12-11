var A = Object.defineProperty;
var V = (t, e, r) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var s = (t, e, r) => (V(t, typeof e != "symbol" ? e + "" : e, r), r);
import P from "axios";
import { successPromise as D } from "lkt-control-tools";
import { toString as x, fill as b, trim as g } from "lkt-string-tools";
import { fetchInObject as p } from "lkt-object-tools";
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
class w {
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
    if (this.value[e] instanceof w)
      return this.value[e];
  }
  exists(e) {
    return this.value[e] instanceof w;
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
class h {
  constructor() {
    s(this, "resources");
    s(this, "environments");
    this.resources = new U(), this.environments = new O();
  }
}
s(h, "router"), s(h, "DEFAULT_ENVIRONMENT");
const F = (t) => {
  const e = [];
  return Object.keys(t).forEach((i) => {
    Array.isArray(t[i]) ? t[i].length > 0 && e.push(`${i}=${JSON.stringify(t[i])}`) : e.push(`${i}=${t[i]}`);
  }), e.join("&");
}, re = (t) => d().resources.exists(t), d = () => (h.router instanceof h || (h.router = new h()), h.router);
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
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return p(e, this.value);
  }
}
class C {
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
class M {
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
class v {
}
s(v, "RESOURCE_PARAM_LEFT_SEPARATOR", "{"), s(v, "RESOURCE_PARAM_RIGHT_SEPARATOR", "}");
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
        const c = this.value[o].renameTo || null || o;
        let n = e[o] || u;
        const m = this.value[o].type || null;
        if (m && n !== null && typeof n !== void 0)
          if (m === "string" && typeof n != "string")
            n = x(n);
          else if (m === "number" && typeof n != "number")
            n = Number(n);
          else {
            if (m === "boolean" && typeof n != "boolean")
              throw new Error(
                `Param '${o}' must be of type boolean. '${n}' received`
              );
            if (m === "array" && !Array.isArray(n))
              throw new Error(
                `Param '${o}' must be a valid array. '${n}' received`
              );
            if (m === "object" && typeof n != "object")
              throw new Error(
                `Param '${o}' must be a valid object. '${n}' received`
              );
          }
        r ? a.append(c, n) : a[c] = n;
      }
    }), a;
  }
  replaceUrlValues(e, r) {
    const i = this.prepareValues(r, !1);
    return b(
      e,
      i,
      v.RESOURCE_PARAM_LEFT_SEPARATOR,
      v.RESOURCE_PARAM_RIGHT_SEPARATOR
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
    return p(e, this.value);
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
    return p(e, this.value);
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
    return p(e, this.value);
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
    s(this, "permDig");
    s(this, "modificationsDig");
    this.data = e, this.url = new L(e.url), this.name = new E(e.name), this.method = new M(e.method), this.environment = new j(e.environment), this.dataType = new H(e.dataType), this.params = new N(e.params), this.isFileUpload = new _(e.isFileUpload), this.validStatuses = new q(e.validStatuses), this.fetchStatus = new C(), this.onSuccess = new I(e.onSuccess), this.returnsFullResponse = new G(e.returnsFullResponse), this.returnsResponseDig = new J(e.digToData), this.maxPageDig = new $(e.digToMaxPage), this.permDig = new K(e.digToPerms), this.modificationsDig = new W(e.digToModifications);
  }
  build(e) {
    let r = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const i = this.url.prepare(this.environment.getUrl());
    let a = this.params.replaceUrlValues(i, e);
    if (this.method.hasUrlParams()) {
      const l = F(r);
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
        return this.fetchStatus.start(), await P(r).then((i) => {
          this.fetchStatus.stop();
          let a = this.returnsFullResponse.value ? i : i.data, o = -1;
          this.maxPageDig.hasToDig() && (o = this.maxPageDig.dig(a));
          let u;
          this.permDig.hasToDig() && (u = this.permDig.dig(a));
          let l = {};
          this.modificationsDig.hasToDig() && (l = this.modificationsDig.dig(a)), this.returnsResponseDig.hasToDig() && (a = this.returnsResponseDig.dig(a));
          const c = { data: a, maxPage: o, perms: u, modifications: l, response: i };
          return this.onSuccess.hasActionDefined() ? this.onSuccess.run(c) : c;
        }).catch((i) => (this.fetchStatus.stop(), Promise.reject(new Error(i))));
      case "download":
      case "open":
        return P.get(r.url, { responseType: "blob" }).then((i) => {
          const a = i.headers["content-disposition"];
          let o = "";
          return a && a.split(";").forEach((l) => {
            const c = l.split("=");
            if (g(c[0]) === "filename") {
              let n = g(c[1]);
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
  return f(e);
}, ne = (t) => {
  const e = { ...t, method: "post" };
  return f(e);
}, ae = (t) => {
  const e = { ...t, method: "put" };
  return f(e);
}, oe = (t) => {
  const e = { ...t, method: "delete" };
  return f(e);
}, ue = (t) => {
  const e = { ...t, method: "open" };
  return f(e);
}, le = (t) => {
  const e = { ...t, method: "download" };
  return f(e);
}, f = (t) => {
  const e = new R(t);
  return d().resources.add(e), S(t.name);
}, z = (t) => {
  const e = new w(t.name, t.url, t.auth);
  return d().environments.add(e), T(t.name);
}, S = (t) => d().resources.get(t), T = (t) => d().environments.get(t), Q = async (t = "", e = {}) => await S(t).call(e);
class X {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return d().resources.exists(this.value);
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
  ne as createHTTPPostResource,
  ae as createHTTPPutResource,
  he as default,
  re as existsHTTPResource,
  T as getHTTPEnvironment,
  S as getHTTPResource,
  d as getRouter,
  Q as httpCall
};
