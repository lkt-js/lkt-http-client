var V = Object.defineProperty;
var x = (e, t, i) => t in e ? V(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var s = (e, t, i) => (x(e, typeof t != "symbol" ? t + "" : t, i), i);
import D from "axios";
import { successPromise as E } from "lkt-control-tools";
import { toString as y, fill as b, trim as R } from "lkt-string-tools";
import { fetchInObject as v } from "lkt-object-tools";
class O {
  constructor(t) {
    s(this, "value");
    t || (t = ""), this.value = t;
  }
}
class S {
  constructor(t) {
    s(this, "value");
    if (t === "")
      throw new Error("A resource must have a valid name");
    this.value = t;
  }
}
class w {
  constructor(t, i, r) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new S(t), this.url = new O(i), this.auth = r;
  }
}
class U {
  constructor() {
    s(this, "value", {});
  }
  add(t) {
    this.value[t.name.value] = t;
  }
  get(t) {
    if (this.value[t] instanceof w)
      return this.value[t];
  }
  exists(t) {
    return this.value[t] instanceof w;
  }
}
class F {
  constructor() {
    s(this, "value", {});
  }
  add(t) {
    this.value[t.name.value] = t;
  }
  get(t) {
    if (this.value[t] instanceof T)
      return this.value[t];
  }
  exists(t) {
    return this.value[t] instanceof T;
  }
}
class h {
  constructor() {
    s(this, "resources");
    s(this, "environments");
    this.resources = new F(), this.environments = new U();
  }
}
s(h, "router"), s(h, "DEFAULT_ENVIRONMENT");
const H = (e) => {
  const t = [];
  return Object.keys(e).forEach((r) => {
    Array.isArray(e[r]) ? e[r].length > 0 && t.push(`${r}=${JSON.stringify(e[r])}`) : t.push(`${r}=${e[r]}`);
  }), t.join("&");
}, at = (e) => d().resources.exists(e), d = () => (h.router instanceof h || (h.router = new h()), h.router);
class M {
  constructor(t) {
    s(this, "value");
    t || (t = "json"), this.value = t;
  }
  isJSON() {
    return this.value === "json";
  }
}
class _ {
  constructor(t) {
    s(this, "value");
    t || (t = "default"), this.value = t;
  }
  getUrl() {
    const t = P(this.value);
    return t ? t.url.value : "";
  }
  getAuth() {
    const t = P(this.value);
    return t && t.auth ? t.auth : {};
  }
}
class $ {
  constructor(t) {
    s(this, "value");
    t || (t = !1), this.value = t;
  }
}
class j {
  constructor(t) {
    s(this, "value");
    t || (t = ""), this.value = t;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(t) {
    return v(t, this.value);
  }
}
class C {
  constructor(t = !1) {
    s(this, "value");
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
class N {
  constructor(t) {
    s(this, "value");
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
class p {
}
s(p, "RESOURCE_PARAM_LEFT_SEPARATOR", "{"), s(p, "RESOURCE_PARAM_RIGHT_SEPARATOR", "}");
class L {
  constructor(t) {
    s(this, "value");
    t || (t = {}), this.value = t;
  }
  prepareValues(t, i = !1) {
    t || (t = {});
    const r = Object.keys(this.value), a = i ? new window.FormData() : {};
    return r.forEach((n) => {
      const u = this.value[n].default || null;
      if (t[n] || u) {
        const m = this.value[n].renameTo || null || n;
        let o = t[n] || u;
        const l = this.value[n].type || null;
        if (l && o !== null && typeof o !== void 0)
          if (l === "string" && typeof o != "string")
            o = y(o);
          else if (l === "number" && typeof o != "number")
            o = Number(o);
          else {
            if (l === "boolean" && typeof o != "boolean")
              throw new Error(
                `Param '${n}' must be of type boolean. '${o}' received`
              );
            if (l === "array" && !Array.isArray(o))
              throw new Error(
                `Param '${n}' must be a valid array. '${o}' received`
              );
            if (l === "object" && typeof o != "object")
              throw new Error(
                `Param '${n}' must be a valid object. '${o}' received`
              );
          }
        i ? a.append(m, o) : a[m] = o;
      }
    }), a;
  }
  replaceUrlValues(t, i) {
    const r = this.prepareValues(i, !1);
    return b(
      t,
      r,
      p.RESOURCE_PARAM_LEFT_SEPARATOR,
      p.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
  }
}
class I {
  constructor(t) {
    s(this, "value");
    if (t === "")
      throw new Error("A resource must have a valid url");
    this.value = t;
  }
  prepare(t) {
    return t ? `${t}${this.value}` : this.value;
  }
}
class G {
  constructor(t) {
    s(this, "value");
    typeof t != "function" && (t = void 0), this.value = t;
  }
  hasActionDefined() {
    return typeof this.value == "function";
  }
  run(t) {
    return this.value(t);
  }
}
class J {
  constructor(t) {
    s(this, "value");
    t || (t = !1), this.value = t;
  }
}
class q {
  constructor(t) {
    s(this, "value");
    t || (t = ""), this.value = t;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(t) {
    return v(t, this.value);
  }
}
class B {
  constructor(t) {
    s(this, "value");
    t || (t = [200, 201, 202]), this.value = t;
  }
  includes(t) {
    return this.value.includes(t);
  }
}
class K {
  constructor(t, i, r, a, n, u) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = t, this.method = i, this.data = r, this.auth = a, this.statusValidator = n, this.headers = u;
  }
}
class W {
  constructor(t) {
    s(this, "value");
    t || (t = ""), this.value = t;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(t) {
    return v(t, this.value);
  }
}
class z {
  constructor(t) {
    s(this, "value");
    t || (t = ""), this.value = t;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(t) {
    return v(t, this.value);
  }
}
class Q {
  constructor(t) {
    s(this, "value");
    typeof t != "function" && (t = void 0), this.value = t;
  }
  hasActionDefined() {
    return typeof this.value == "function";
  }
  run(t) {
    return this.value(t);
  }
}
class T {
  constructor(t) {
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
    s(this, "mapData");
    s(this, "returnsFullResponse");
    s(this, "returnsResponseDig");
    s(this, "maxPageDig");
    s(this, "permDig");
    s(this, "modificationsDig");
    this.data = t, this.url = new I(t.url), this.name = new S(t.name), this.method = new N(t.method), this.environment = new _(t.environment), this.dataType = new M(t.dataType), this.params = new L(t.params), this.isFileUpload = new $(t.isFileUpload), this.validStatuses = new B(t.validStatuses), this.fetchStatus = new C(), this.onSuccess = new G(t.onSuccess), this.mapData = new Q(t.mapData), this.returnsFullResponse = new J(t.returnsFullResponse), this.returnsResponseDig = new q(t.digToData), this.maxPageDig = new j(t.digToMaxPage), this.permDig = new W(t.digToPerms), this.modificationsDig = new z(t.digToModifications);
  }
  build(t) {
    let i = this.params.prepareValues(
      t,
      this.isFileUpload.value
    );
    const r = this.url.prepare(this.environment.getUrl());
    let a = this.params.replaceUrlValues(r, t);
    if (this.method.hasUrlParams()) {
      const c = H(i);
      c.length > 0 && (a = [a, c].join("?")), i = {};
    }
    const n = (c) => this.validStatuses.includes(c);
    let u;
    return this.isFileUpload.value && (u = {
      "Content-Type": "multipart/form-data"
    }), new K(
      a,
      this.method.toPrimitive(),
      i,
      this.environment.getAuth(),
      n,
      u
    );
  }
  async call(t) {
    const i = this.build(t);
    if (this.fetchStatus.inProgress())
      return E();
    switch (i.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), await D(i).then((r) => {
          this.fetchStatus.stop();
          let a = this.returnsFullResponse.value ? r : r.data, n = -1;
          this.maxPageDig.hasToDig() && (n = this.maxPageDig.dig(a));
          let u;
          this.permDig.hasToDig() && (u = this.permDig.dig(a));
          let c = {};
          this.modificationsDig.hasToDig() && (c = this.modificationsDig.dig(a)), this.returnsResponseDig.hasToDig() && (a = this.returnsResponseDig.dig(a)), this.mapData.hasActionDefined() && (a = this.mapData.run(a));
          const m = { data: a, maxPage: n, perms: u, modifications: c, response: r, success: !0, httpStatus: r.status };
          return this.onSuccess.hasActionDefined() ? this.onSuccess.run(m) : m;
        }).catch((r) => {
          this.fetchStatus.stop();
          let a = [];
          return { data: {
            status: r.response.status
          }, maxPage: -1, perms: a, modifications: {}, response: r, success: !1, httpStatus: r.response.status };
        });
      case "download":
      case "open":
        return D.get(i.url, { responseType: "blob" }).then((r) => {
          const a = r.headers["content-disposition"];
          let n = "";
          a && a.split(";").forEach((o) => {
            const l = o.split("=");
            if (R(l[0]) === "filename") {
              let g = R(l[1]);
              g = R(g, '"'), n = g;
            }
          }), window.download(r.data, n);
          let u = [];
          const c = { data: r.data, maxPage: 0, perms: u, modifications: {}, response: r, success: !0, httpStatus: r.status };
          return this.onSuccess.hasActionDefined() ? this.onSuccess.run(c) : r;
        }).catch((r) => r);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(i)}`
        );
    }
  }
}
const nt = (e) => {
  const t = { ...e, method: "get" };
  return f(t);
}, ot = (e) => {
  const t = { ...e, method: "post" };
  return f(t);
}, ut = (e) => {
  const t = { ...e, method: "put" };
  return f(t);
}, ct = (e) => {
  const t = { ...e, method: "delete" };
  return f(t);
}, lt = (e) => {
  const t = { ...e, method: "open" };
  return f(t);
}, ht = (e) => {
  const t = { ...e, method: "download" };
  return f(t);
}, f = (e) => {
  const t = new T(e);
  return d().resources.add(t), A(e.name);
}, X = (e) => {
  const t = new w(e.name, e.url, e.auth);
  return d().environments.add(t), P(e.name);
}, A = (e) => d().resources.get(e), P = (e) => d().environments.get(e), Y = async (e = "", t = {}) => await A(e).call(t);
class Z {
  constructor(t) {
    s(this, "value");
    t || (t = ""), this.value = t;
  }
  exists() {
    return d().resources.exists(this.value);
  }
  async call(t) {
    return await Y(this.value, t);
  }
}
class k {
  constructor(t) {
    s(this, "value");
    t || (t = {}), this.value = t;
  }
  setParam(t, i) {
    this.value[t] = i;
  }
  getParams() {
    return this.value;
  }
}
class mt {
  constructor(t) {
    s(this, "resource");
    s(this, "params");
    this.resource = new Z(t.resource), this.params = new k(t.params);
  }
  isCallable() {
    return this.resource.exists();
  }
  setParam(t, i) {
    this.params.setParam(t, i);
  }
  setParams(t) {
    Object.keys(t).forEach((i) => {
      this.params.setParam(i, t[i]);
    });
  }
  async call() {
    return this.isCallable() ? await this.resource.call(this.params.getParams()) : await E();
  }
}
const dt = {
  install: (e, t) => {
    X({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  mt as ResourceCaller,
  ct as createHTTPDeleteResource,
  ht as createHTTPDownloadResource,
  X as createHTTPEnvironment,
  nt as createHTTPGetResource,
  lt as createHTTPOpenResource,
  ot as createHTTPPostResource,
  ut as createHTTPPutResource,
  dt as default,
  at as existsHTTPResource,
  P as getHTTPEnvironment,
  A as getHTTPResource,
  d as getRouter,
  Y as httpCall
};
