var g = Object.defineProperty;
var A = (t, e, n) => e in t ? g(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var s = (t, e, n) => (A(t, typeof e != "symbol" ? e + "" : e, n), n);
import T from "axios";
import { successPromise as O, emptyPromise as N } from "lkt-control-tools";
import { toString as V, fill as U, trim as R } from "lkt-string-tools";
import { fetchInObject as D } from "lkt-object-tools";
class b {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
}
class w {
  constructor(e) {
    s(this, "value");
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class S {
  constructor(e, n, r) {
    s(this, "name");
    s(this, "url");
    s(this, "auth");
    this.name = new w(e), this.url = new b(n), this.auth = r;
  }
}
const l = class {
  static addResource(e) {
    l.RESOURCES[e.name.value] = e;
  }
  static addEnvironment(e) {
    typeof l.DEFAULT_ENVIRONMENT > "u" && (l.DEFAULT_ENVIRONMENT = e.name.value), l.ENVIRONMENTS[e.name.value] = e;
  }
  static getEnvironment(e) {
    if (l.ENVIRONMENTS[e] instanceof S)
      return l.ENVIRONMENTS[e];
  }
};
let u = l;
s(u, "RESOURCES", {}), s(u, "ENVIRONMENTS", {}), s(u, "DEFAULT_ENVIRONMENT"), s(u, "getResource", (e) => {
  if (l.RESOURCES[e] instanceof v)
    return l.RESOURCES[e];
}), s(u, "existsResource", (e) => l.RESOURCES[e] instanceof v);
const y = (t) => {
  const e = [];
  return Object.keys(t).forEach((r) => {
    Array.isArray(t[r]) ? t[r].length > 0 && e.push(`${r}=${JSON.stringify(t[r])}`) : e.push(`${r}=${t[r]}`);
  }), e.join("&");
}, k = (t) => u.existsResource(t);
class F {
  constructor(e) {
    s(this, "value");
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class x {
  constructor(e) {
    s(this, "value");
    e || (e = "default"), this.value = e;
  }
  getUrl() {
    const e = E(this.value);
    return e ? e.url.value : "";
  }
  getAuth() {
    const e = E(this.value);
    return e && e.auth ? e.auth : {};
  }
}
class C {
  constructor(e) {
    s(this, "value");
    e || (e = !1), this.value = e;
  }
}
class H {
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
class $ {
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
class j {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  prepareValues(e, n = !1) {
    e || (e = {});
    const r = Object.keys(this.value), o = n ? new window.FormData() : {};
    return r.forEach((a) => {
      const c = this.value[a].default || null;
      if (e[a] || c) {
        const m = this.value[a].renameTo || null || a;
        let i = e[a] || c;
        const d = this.value[a].type || null;
        if (d && i !== null && typeof i !== void 0)
          if (d === "string" && typeof i != "string")
            i = V(i);
          else if (d === "number" && typeof i != "number")
            i = Number(i);
          else {
            if (d === "boolean" && typeof i != "boolean")
              throw new Error(
                `Param '${a}' must be of type boolean. '${i}' received`
              );
            if (d === "array" && !Array.isArray(i))
              throw new Error(
                `Param '${a}' must be a valid array. '${i}' received`
              );
            if (d === "object" && typeof i != "object")
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
    return U(
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
class _ {
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
class L {
  constructor(e) {
    s(this, "value");
    e || (e = [200, 201, 202]), this.value = e;
  }
  includes(e) {
    return this.value.includes(e);
  }
}
class J {
  constructor(e, n, r, o, a, c) {
    s(this, "url");
    s(this, "method");
    s(this, "data");
    s(this, "auth");
    s(this, "statusValidator");
    s(this, "headers");
    this.url = e, this.method = n, this.data = r, this.auth = o, this.statusValidator = a, this.headers = c;
  }
}
class v {
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
    this.data = e, this.url = new I(e.url), this.name = new w(e.name), this.method = new $(e.method), this.environment = new x(e.environment), this.dataType = new F(e.dataType), this.params = new j(e.params), this.isFileUpload = new C(e.isFileUpload), this.validStatuses = new L(e.validStatuses), this.fetchStatus = new H(), this.onSuccess = new M(e.onSuccess), this.returnsFullResponse = new _(
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
      const h = y(n);
      h.length > 0 && (o = [o, h].join("?")), n = {};
    }
    const a = (h) => this.validStatuses.includes(h);
    let c;
    return this.isFileUpload.value && (c = {
      "Content-Type": "multipart/form-data"
    }), new J(
      o,
      this.method.toPrimitive(),
      n,
      this.environment.getAuth(),
      a,
      c
    );
  }
  call(e) {
    const n = this.build(e);
    if (this.fetchStatus.inProgress())
      return O();
    switch (n.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), T(n).then((r) => {
          this.fetchStatus.stop();
          let o = this.returnsFullResponse.value ? r : r.data;
          return this.returnsResponseDig.hasToDig() && (o = this.returnsResponseDig.dig(o)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(o) : o;
        }).catch((r) => (this.fetchStatus.stop(), Promise.reject(new Error(r))));
      case "download":
      case "open":
        return T.get(n.url, { responseType: "blob" }).then((r) => {
          const o = r.headers["content-disposition"];
          let a = "";
          return o && o.split(";").forEach((h) => {
            const m = h.split("=");
            if (R(m[0]) === "filename") {
              let i = R(m[1]);
              i = R(i, '"'), a = i;
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
const ee = (t) => {
  const e = { ...t, method: "get" };
  return f(e);
}, te = (t) => {
  const e = { ...t, method: "post" };
  return f(e);
}, se = (t) => {
  const e = { ...t, method: "put" };
  return f(e);
}, re = (t) => {
  const e = { ...t, method: "delete" };
  return f(e);
}, ne = (t) => {
  const e = { ...t, method: "open" };
  return f(e);
}, ie = (t) => {
  const e = { ...t, method: "download" };
  return f(e);
}, f = (t) => {
  const e = new v(t);
  return u.addResource(e), P(t.name);
}, q = (t) => {
  const e = new S(t.name, t.url, t.auth);
  return u.addEnvironment(e), E(t.name);
}, P = (t) => u.getResource(t), E = (t) => u.getEnvironment(t), B = (t = "", e = {}) => P(t).call(e);
class K {
  constructor(e) {
    s(this, "value");
    e || (e = ""), this.value = e;
  }
  exists() {
    return u.existsResource(this.value);
  }
  call(e) {
    return B(this.value, e);
  }
}
class W {
  constructor(e) {
    s(this, "value");
    e || (e = {}), this.value = e;
  }
  getParams() {
    return this.value;
  }
}
class oe {
  constructor(e) {
    s(this, "resource");
    s(this, "params");
    this.resource = new K(e.resource), this.params = new W(e.params);
  }
  isCallable() {
    return this.resource.exists();
  }
  call() {
    return this.isCallable() ? this.resource.call(this.params.getParams()) : N();
  }
}
const ae = {
  install: (t, e) => {
    q({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  oe as ResourceCaller,
  re as createHTTPDeleteResource,
  ie as createHTTPDownloadResource,
  q as createHTTPEnvironment,
  ee as createHTTPGetResource,
  ne as createHTTPOpenResource,
  te as createHTTPPostResource,
  se as createHTTPPutResource,
  ae as default,
  k as existsHTTPResource,
  E as getHTTPEnvironment,
  P as getHTTPResource,
  B as httpCall
};
