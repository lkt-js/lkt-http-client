var A = Object.defineProperty;
var V = (t, e, n) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var s = (t, e, n) => (V(t, typeof e != "symbol" ? e + "" : e, n), n);
import E from "axios";
import { successPromise as g } from "lkt-control-tools";
import { toString as b, fill as y, trim as v } from "lkt-string-tools";
import { fetchInObject as D } from "lkt-object-tools";
class O {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
}
class P {
  constructor(e) {
    s(this, "value");
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class R {
  constructor(e, n, r) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new P(e), this.url = new O(n), this.auth = r;
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
  return Object.keys(t).forEach((r) => {
    Array.isArray(t[r]) ? t[r].length > 0 && e.push(`${r}=${JSON.stringify(t[r])}`) : e.push(`${r}=${t[r]}`);
  }), e.join("&");
}, ee = (t) => d().resources.exists(t), d = () => (c.router instanceof c || (c.router = new c()), c.router);
class H {
  constructor(e) {
    s(this, "value");
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class _ {
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
class $ {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class j {
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
  prepareValues(e, n = !1) {
    e || (e = {});
    const r = Object.keys(this.value), o = n ? new window.FormData() : {};
    return r.forEach((a) => {
      const u = this.value[a].default || null;
      if (e[a] || u) {
        const m = this.value[a].renameTo || null || a;
        let i = e[a] || u;
        const h = this.value[a].type || null;
        if (h && i !== null && typeof i !== void 0)
          if (h === "string" && typeof i != "string")
            i = b(i);
          else if (h === "number" && typeof i != "number")
            i = Number(i);
          else {
            if (h === "boolean" && typeof i != "boolean")
              throw new Error(
                `Param '${a}' must be of type boolean. '${i}' received`
              );
            if (h === "array" && !Array.isArray(i))
              throw new Error(
                `Param '${a}' must be a valid array. '${i}' received`
              );
            if (h === "object" && typeof i != "object")
              throw new Error(
                `Param '${a}' must be a valid object. '${i}' received`
              );
          }
        n ? o.append(m, i) : o[m] = i;
      }
    }), o;
  }
  replaceUrlValues(e, n) {
    const r = this.prepareValues(n, !1);
    return y(
      e,
      r,
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
  constructor(e, n, r, o, a, u) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = e, this.method = n, this.data = r, this.auth = o, this.statusValidator = a, this.headers = u;
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
    this.data = e, this.url = new L(e.url), this.name = new P(e.name), this.method = new N(e.method), this.environment = new _(e.environment), this.dataType = new H(e.dataType), this.params = new C(e.params), this.isFileUpload = new $(e.isFileUpload), this.validStatuses = new J(e.validStatuses), this.fetchStatus = new j(), this.onSuccess = new M(e.onSuccess), this.returnsFullResponse = new I(
      e.returnsFullResponse
    ), this.returnsResponseDig = new G(
      e.returnsResponseDig
    );
  }
  build(e) {
    let n = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const r = this.url.prepare(this.environment.getUrl());
    let o = this.params.replaceUrlValues(r, e);
    if (this.method.hasUrlParams()) {
      const l = F(n);
      l.length > 0 && (o = [o, l].join("?")), n = {};
    }
    const a = (l) => this.validStatuses.includes(l);
    let u;
    return this.isFileUpload.value && (u = {
      "Content-Type": "multipart/form-data"
    }), new q(
      o,
      this.method.toPrimitive(),
      n,
      this.environment.getAuth(),
      a,
      u
    );
  }
  async call(e) {
    const n = this.build(e);
    if (this.fetchStatus.inProgress())
      return g();
    switch (n.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), await E(n).then((r) => {
          this.fetchStatus.stop();
          let o = this.returnsFullResponse.value ? r : r.data;
          return this.returnsResponseDig.hasToDig() && (o = this.returnsResponseDig.dig(o)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(o) : o;
        }).catch((r) => (this.fetchStatus.stop(), Promise.reject(new Error(r))));
      case "download":
      case "open":
        return E.get(n.url, { responseType: "blob" }).then((r) => {
          const o = r.headers["content-disposition"];
          let a = "";
          return o && o.split(";").forEach((l) => {
            const m = l.split("=");
            if (v(m[0]) === "filename") {
              let i = v(m[1]);
              i = v(i, '"'), a = i;
            }
          }), window.download(r.data, a), this.onSuccess.hasActionDefined() ? this.onSuccess.run(r) : r;
        }).catch((r) => r);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(n)}`
        );
    }
  }
}
const te = (t) => {
  const e = { ...t, method: "get" };
  return f(e);
}, se = (t) => {
  const e = { ...t, method: "post" };
  return f(e);
}, re = (t) => {
  const e = { ...t, method: "put" };
  return f(e);
}, ne = (t) => {
  const e = { ...t, method: "delete" };
  return f(e);
}, ie = (t) => {
  const e = { ...t, method: "open" };
  return f(e);
}, oe = (t) => {
  const e = { ...t, method: "download" };
  return f(e);
}, f = (t) => {
  const e = new w(t);
  return d().resources.add(e), S(t.name);
}, B = (t) => {
  const e = new R(t.name, t.url, t.auth);
  return d().environments.add(e), T(t.name);
}, S = (t) => d().resources.get(t), T = (t) => d().environments.get(t), K = async (t = "", e = {}) => await S(t).call(e);
class W {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return d().resources.exists(this.value);
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
  getParams() {
    return this.value;
  }
}
class ae {
  constructor(e) {
    s(this, "resource");
    s(this, "params");
    this.resource = new W(e.resource), this.params = new z(e.params);
  }
  isCallable() {
    return this.resource.exists();
  }
  async call() {
    return this.isCallable() ? await this.resource.call(this.params.getParams()) : await g();
  }
}
const ue = {
  install: (t, e) => {
    B({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  ae as ResourceCaller,
  ne as createHTTPDeleteResource,
  oe as createHTTPDownloadResource,
  B as createHTTPEnvironment,
  te as createHTTPGetResource,
  ie as createHTTPOpenResource,
  se as createHTTPPostResource,
  re as createHTTPPutResource,
  ue as default,
  ee as existsHTTPResource,
  T as getHTTPEnvironment,
  S as getHTTPResource,
  d as getRouter,
  K as httpCall
};
