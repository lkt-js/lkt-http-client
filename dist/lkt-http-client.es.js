var V = Object.defineProperty;
var x = (t, e, i) => e in t ? V(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var s = (t, e, i) => (x(t, typeof e != "symbol" ? e + "" : e, i), i);
import D from "axios";
import { successPromise as E } from "lkt-control-tools";
import { toString as b, fill as y, trim as R } from "lkt-string-tools";
import { fetchInObject as v } from "lkt-object-tools";
class O {
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
class w {
  constructor(e, i, r) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new S(e), this.url = new O(i), this.auth = r;
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
class F {
  constructor() {
    s(this, "value", {});
  }
  add(e) {
    this.value[e.name.value] = e;
  }
  get(e) {
    if (this.value[e] instanceof T)
      return this.value[e];
  }
  exists(e) {
    return this.value[e] instanceof T;
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
const H = (t) => {
  const e = [];
  return Object.keys(t).forEach((r) => {
    Array.isArray(t[r]) ? t[r].length > 0 && e.push(`${r}=${JSON.stringify(t[r])}`) : e.push(`${r}=${t[r]}`);
  }), e.join("&");
}, ie = (t) => d().resources.exists(t), d = () => (h.router instanceof h || (h.router = new h()), h.router);
class _ {
  constructor(e) {
    s(this, "value");
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class $ {
  constructor(e) {
    s(this, "value");
    e || (e = "default"), this.value = e;
  }
  getUrl() {
    const e = P(this.value);
    return e ? e.url.value : "";
  }
  getAuth() {
    const e = P(this.value);
    return e && e.auth ? e.auth : {};
  }
}
class j {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class C {
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
class M {
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
class L {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  prepareValues(e, i = !1) {
    e || (e = {});
    const r = Object.keys(this.value), a = i ? new window.FormData() : {};
    return r.forEach((n) => {
      const u = this.value[n].default || null;
      if (e[n] || u) {
        const m = this.value[n].renameTo || null || n;
        let o = e[n] || u;
        const c = this.value[n].type || null;
        if (c && o !== null && typeof o !== void 0)
          if (c === "string" && typeof o != "string")
            o = b(o);
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
        i ? a.append(m, o) : a[m] = o;
      }
    }), a;
  }
  replaceUrlValues(e, i) {
    const r = this.prepareValues(i, !1);
    return y(
      e,
      r,
      p.RESOURCE_PARAM_LEFT_SEPARATOR,
      p.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
  }
}
class I {
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
class G {
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
class J {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class q {
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
class B {
  constructor(e) {
    s(this, "value");
    e || (e = [200, 201, 202]), this.value = e;
  }
  includes(e) {
    return this.value.includes(e);
  }
}
class K {
  constructor(e, i, r, a, n, u) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = e, this.method = i, this.data = r, this.auth = a, this.statusValidator = n, this.headers = u;
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
class z {
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
class T {
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
    this.data = e, this.url = new I(e.url), this.name = new S(e.name), this.method = new N(e.method), this.environment = new $(e.environment), this.dataType = new _(e.dataType), this.params = new L(e.params), this.isFileUpload = new j(e.isFileUpload), this.validStatuses = new B(e.validStatuses), this.fetchStatus = new M(), this.onSuccess = new G(e.onSuccess), this.returnsFullResponse = new J(e.returnsFullResponse), this.returnsResponseDig = new q(e.digToData), this.maxPageDig = new C(e.digToMaxPage), this.permDig = new W(e.digToPerms), this.modificationsDig = new z(e.digToModifications);
  }
  build(e) {
    let i = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const r = this.url.prepare(this.environment.getUrl());
    let a = this.params.replaceUrlValues(r, e);
    if (this.method.hasUrlParams()) {
      const l = H(i);
      l.length > 0 && (a = [a, l].join("?")), i = {};
    }
    const n = (l) => this.validStatuses.includes(l);
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
  async call(e) {
    const i = this.build(e);
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
          let l = {};
          this.modificationsDig.hasToDig() && (l = this.modificationsDig.dig(a)), this.returnsResponseDig.hasToDig() && (a = this.returnsResponseDig.dig(a));
          const m = { data: a, maxPage: n, perms: u, modifications: l, response: r, success: !0, httpStatus: r.status };
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
            const c = o.split("=");
            if (R(c[0]) === "filename") {
              let g = R(c[1]);
              g = R(g, '"'), n = g;
            }
          }), window.download(r.data, n);
          let u = [];
          const l = { data: r.data, maxPage: 0, perms: u, modifications: {}, response: r, success: !0, httpStatus: r.status };
          return this.onSuccess.hasActionDefined() ? this.onSuccess.run(l) : r;
        }).catch((r) => r);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(i)}`
        );
    }
  }
}
const ae = (t) => {
  const e = { ...t, method: "get" };
  return f(e);
}, ne = (t) => {
  const e = { ...t, method: "post" };
  return f(e);
}, oe = (t) => {
  const e = { ...t, method: "put" };
  return f(e);
}, ue = (t) => {
  const e = { ...t, method: "delete" };
  return f(e);
}, le = (t) => {
  const e = { ...t, method: "open" };
  return f(e);
}, ce = (t) => {
  const e = { ...t, method: "download" };
  return f(e);
}, f = (t) => {
  const e = new T(t);
  return d().resources.add(e), A(t.name);
}, Q = (t) => {
  const e = new w(t.name, t.url, t.auth);
  return d().environments.add(e), P(t.name);
}, A = (t) => d().resources.get(t), P = (t) => d().environments.get(t), X = async (t = "", e = {}) => await A(t).call(e);
class Y {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return d().resources.exists(this.value);
  }
  async call(e) {
    return await X(this.value, e);
  }
}
class Z {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  setParam(e, i) {
    this.value[e] = i;
  }
  getParams() {
    return this.value;
  }
}
class he {
  constructor(e) {
    s(this, "resource");
    s(this, "params");
    this.resource = new Y(e.resource), this.params = new Z(e.params);
  }
  isCallable() {
    return this.resource.exists();
  }
  setParam(e, i) {
    this.params.setParam(e, i);
  }
  setParams(e) {
    Object.keys(e).forEach((i) => {
      this.params.setParam(i, e[i]);
    });
  }
  async call() {
    return this.isCallable() ? await this.resource.call(this.params.getParams()) : await E();
  }
}
const me = {
  install: (t, e) => {
    Q({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  he as ResourceCaller,
  ue as createHTTPDeleteResource,
  ce as createHTTPDownloadResource,
  Q as createHTTPEnvironment,
  ae as createHTTPGetResource,
  le as createHTTPOpenResource,
  ne as createHTTPPostResource,
  oe as createHTTPPutResource,
  me as default,
  ie as existsHTTPResource,
  P as getHTTPEnvironment,
  A as getHTTPResource,
  d as getRouter,
  X as httpCall
};
