import P from "axios";
import { emptyPromise as _ } from "lkt-control-tools";
import { fetchInObject as N, deleteObjectProperties as y } from "lkt-object-tools";
import { toString as b, extractFillData as D, fill as U, trim as E } from "lkt-string-tools";
class V {
  constructor(e) {
    e || (e = ""), this.value = e;
  }
}
class O {
  constructor(e) {
    if (e === "")
      throw new Error("A resource must have a valid name");
    this.value = e;
  }
}
class g {
  constructor(e, s, i) {
    this.name = new O(e), this.url = new V(s), this.auth = i;
  }
}
const a = class {
  static addResource(t) {
    a.RESOURCES[t.name.value] = t;
  }
  static addEnvironment(t) {
    typeof a.DEFAULT_ENVIRONMENT > "u" && (a.DEFAULT_ENVIRONMENT = t.name.value), a.ENVIRONMENTS[t.name.value] = t;
  }
  static getEnvironment(t) {
    if (a.ENVIRONMENTS[t] instanceof g)
      return a.ENVIRONMENTS[t];
  }
};
let c = a;
c.RESOURCES = {};
c.ENVIRONMENTS = {};
c.DEFAULT_ENVIRONMENT = void 0;
c.getResource = (t) => {
  if (a.RESOURCES[t] instanceof T)
    return a.RESOURCES[t];
};
c.existsResource = (t) => a.RESOURCES[t] instanceof T;
const j = (t) => {
  const e = [];
  return Object.keys(t).forEach((i) => {
    Array.isArray(t[i]) ? t[i].length > 0 && e.push(`${i}=${JSON.stringify(t[i])}`) : e.push(`${i}=${t[i]}`);
  }), e.join("&");
}, se = (t) => c.existsResource(t);
class f {
}
f.RESOURCE_PARAM_LEFT_SEPARATOR = "{";
f.RESOURCE_PARAM_RIGHT_SEPARATOR = "}";
class F {
  constructor(e) {
    e || (e = "json"), this.value = e;
  }
  isJSON() {
    return this.value === "json";
  }
}
class H {
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
class I {
  constructor(e) {
    e || (e = !1), this.value = e;
  }
}
class x {
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
class C {
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
class L {
  constructor(e) {
    e || (e = {}), this.value = e;
  }
  prepareValues(e, s = !1) {
    e || (e = {});
    const i = Object.keys(this.value), n = s ? new window.FormData() : {};
    return i.forEach((r) => {
      const l = this.value[r].default || null;
      if (e[r] || l) {
        const h = this.value[r].renameTo || null || r;
        let o = e[r] || l;
        const u = this.value[r].type || null;
        if (u && o !== null && typeof o !== void 0)
          if (u === "string" && typeof o != "string")
            o = b(o);
          else if (u === "number" && typeof o != "number")
            o = Number(o);
          else {
            if (u === "boolean" && typeof o != "boolean")
              throw new Error(`Param '${r}' must be of type boolean. '${o}' received`);
            if (u === "array" && !Array.isArray(o))
              throw new Error(`Param '${r}' must be a valid array. '${o}' received`);
            if (u === "object" && typeof o != "object")
              throw new Error(`Param '${r}' must be a valid object. '${o}' received`);
          }
        s ? n.append(h, o) : n[h] = o;
      }
    }), n;
  }
}
class M {
  constructor(e) {
    if (e === "")
      throw new Error("A resource must have a valid url");
    this.value = e;
  }
  prepare(e) {
    return e ? `${e}${this.value}` : this.value;
  }
}
class $ {
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
class G {
  constructor(e) {
    e || (e = !1), this.value = e;
  }
}
class J {
  constructor(e) {
    e || (e = ""), this.value = e;
  }
  hasToDig() {
    return this.value !== "";
  }
  dig(e) {
    return N(e, this.value);
  }
}
class q {
  constructor(e) {
    e || (e = [200, 201, 202]), this.value = e;
  }
  includes(e) {
    return this.value.includes(e);
  }
}
class B {
  constructor(e, s, i, n, r, l) {
    this.url = e, this.method = s, this.data = i, this.auth = n, this.statusValidator = r, this.headers = l;
  }
}
class T {
  constructor(e) {
    this.data = e, this.url = new M(e.url), this.name = new O(e.name), this.method = new C(e.method), this.environment = new H(e.environment), this.dataType = new F(e.dataType), this.params = new L(e.params), this.isFileUpload = new I(e.isFileUpload), this.validStatuses = new q(e.validStatuses), this.fetchStatus = new x(), this.onSuccess = new $(e.onSuccess), this.returnsFullResponse = new G(e.returnsFullResponse), this.returnsResponseDig = new J(e.returnsResponseDig);
  }
  build(e) {
    let s = this.params.prepareValues(
      e,
      this.isFileUpload.value
    );
    const i = this.url.prepare(this.environment.getUrl()), n = D(
      i,
      s,
      f.RESOURCE_PARAM_LEFT_SEPARATOR,
      f.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
    let r = U(
      i,
      s,
      f.RESOURCE_PARAM_LEFT_SEPARATOR,
      f.RESOURCE_PARAM_RIGHT_SEPARATOR
    );
    if (s = y(s, n), this.method.hasUrlParams()) {
      const h = j(s);
      h.length > 0 && (r = [r, h].join("?")), s = {};
    }
    const l = (h) => this.validStatuses.includes(h);
    let m;
    return this.isFileUpload.value && (m = {
      "Content-Type": "multipart/form-data"
    }), new B(
      r,
      this.method.toPrimitive(),
      s,
      this.environment.getAuth(),
      l,
      m
    );
  }
  call(e) {
    const s = this.build(e), i = (n, r) => {
      n(void 0);
    };
    if (this.fetchStatus.inProgress())
      return _(i);
    switch (s.method) {
      case "get":
      case "post":
      case "put":
      case "delete":
        return this.fetchStatus.start(), P(s).then((n) => {
          this.fetchStatus.stop();
          let r = this.returnsFullResponse.value ? n : n.data;
          return this.returnsResponseDig.hasToDig() && (r = this.returnsResponseDig.dig(r)), this.onSuccess.hasActionDefined() ? this.onSuccess.run(r) : r;
        }).catch((n) => (this.fetchStatus.stop(), Promise.reject(new Error(n))));
      case "download":
      case "open":
        return P.get(s.url, { responseType: "blob" }).then((n) => {
          const r = n.headers["content-disposition"];
          let l = "";
          return r && r.split(";").forEach((h) => {
            const o = h.split("=");
            if (E(o[0]) === "filename") {
              let u = E(o[1]);
              u = E(u, '"'), l = u;
            }
          }), window.download(n.data, l), this.onSuccess.hasActionDefined() ? this.onSuccess.run(n) : n;
        }).catch((n) => n);
      default:
        throw new Error(
          `Error: Invalid method in call ${JSON.stringify(s)}`
        );
    }
  }
}
var K = Object.defineProperty, W = Object.defineProperties, z = Object.getOwnPropertyDescriptors, w = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, X = Object.prototype.propertyIsEnumerable, S = (t, e, s) => e in t ? K(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, p = (t, e) => {
  for (var s in e || (e = {}))
    Q.call(e, s) && S(t, s, e[s]);
  if (w)
    for (var s of w(e))
      X.call(e, s) && S(t, s, e[s]);
  return t;
}, d = (t, e) => W(t, z(e));
const re = (t) => {
  const e = d(p({}, t), { method: "get" });
  return R(e);
}, ne = (t) => {
  const e = d(p({}, t), { method: "post" });
  return R(e);
}, oe = (t) => {
  const e = d(p({}, t), { method: "put" });
  return R(e);
}, ie = (t) => {
  const e = d(p({}, t), { method: "delete" });
  return R(e);
}, ue = (t) => {
  const e = d(p({}, t), { method: "open" });
  return R(e);
}, ae = (t) => {
  const e = d(p({}, t), { method: "download" });
  return R(e);
}, R = (t) => {
  const e = new T(t);
  return c.addResource(e), A(t.name);
}, Y = (t) => {
  const e = new g(t.name, t.url, t.auth);
  return c.addEnvironment(e), v(t.name);
}, A = (t) => c.getResource(t), v = (t) => c.getEnvironment(t), ce = (t = "", e = {}) => A(t).call(e), le = {
  install: (t, e) => {
    Y({ name: "default", url: "" }), window.download = require("downloadjs");
  }
};
export {
  ie as createHTTPDeleteResource,
  ae as createHTTPDownloadResource,
  Y as createHTTPEnvironment,
  re as createHTTPGetResource,
  ue as createHTTPOpenResource,
  ne as createHTTPPostResource,
  oe as createHTTPPutResource,
  le as default,
  se as existsHTTPResource,
  v as getHTTPEnvironment,
  A as getHTTPResource,
  ce as httpCall
};
