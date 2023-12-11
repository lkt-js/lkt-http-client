(function(r,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("axios"),require("lkt-control-tools"),require("lkt-string-tools"),require("lkt-object-tools")):typeof define=="function"&&define.amd?define(["exports","axios","lkt-control-tools","lkt-string-tools","lkt-object-tools"],c):(r=typeof globalThis<"u"?globalThis:r||self,c(r.LktHttpClient={},r.axios,r.LktControlTools,r.LktStringTools,r.LktObjectTools))})(this,function(r,c,d,T,R){"use strict";var ne=Object.defineProperty;var ae=(r,c,d)=>c in r?ne(r,c,{enumerable:!0,configurable:!0,writable:!0,value:d}):r[c]=d;var s=(r,c,d)=>(ae(r,typeof c!="symbol"?c+"":c,d),d);const S=(t=>t&&typeof t=="object"&&"default"in t?t:{default:t})(c);class H{constructor(e){s(this,"value");e||(e=""),this.value=e}}class y{constructor(e){s(this,"value");if(e==="")throw new Error("A resource must have a valid name");this.value=e}}class D{constructor(e,n,i){s(this,"name");s(this,"url");s(this,"auth");this.name=new y(e),this.url=new H(n),this.auth=i}}class O{constructor(){s(this,"value",{})}add(e){this.value[e.name.value]=e}get(e){if(this.value[e]instanceof D)return this.value[e]}exists(e){return this.value[e]instanceof D}}class U{constructor(){s(this,"value",{})}add(e){this.value[e.name.value]=e}get(e){if(this.value[e]instanceof E)return this.value[e]}exists(e){return this.value[e]instanceof E}}class m{constructor(){s(this,"resources");s(this,"environments");this.resources=new U,this.environments=new O}}s(m,"router"),s(m,"DEFAULT_ENVIRONMENT");const j=t=>{const e=[];return Object.keys(t).forEach(i=>{Array.isArray(t[i])?t[i].length>0&&e.push(`${i}=${JSON.stringify(t[i])}`):e.push(`${i}=${t[i]}`)}),e.join("&")},_=t=>v().resources.exists(t),v=()=>(m.router instanceof m||(m.router=new m),m.router);class x{constructor(e){s(this,"value");e||(e="json"),this.value=e}isJSON(){return this.value==="json"}}class C{constructor(e){s(this,"value");e||(e="default"),this.value=e}getUrl(){const e=w(this.value);return e?e.url.value:""}getAuth(){const e=w(this.value);return e&&e.auth?e.auth:{}}}class F{constructor(e){s(this,"value");e||(e=!1),this.value=e}}class L{constructor(e){s(this,"value");e||(e=""),this.value=e}hasToDig(){return this.value!==""}dig(e){return R.fetchInObject(e,this.value)}}class M{constructor(e=!1){s(this,"value");this.value=e}inProgress(){return this.value}start(){this.value=!0}stop(){this.value=!1}}class ${constructor(e){s(this,"value");e||(e="get"),this.value=e}toPrimitive(){return this.value.toLowerCase()}isGET(){return this.value==="get"}isPOST(){return this.value==="post"}isPUT(){return this.value==="put"}isDELETE(){return this.value==="delete"}isOPEN(){return this.value==="open"}isDOWNLOAD(){return this.value==="download"}hasUrlParams(){return this.isGET()||this.isOPEN()}}class P{}s(P,"RESOURCE_PARAM_LEFT_SEPARATOR","{"),s(P,"RESOURCE_PARAM_RIGHT_SEPARATOR","}");class N{constructor(e){s(this,"value");e||(e={}),this.value=e}prepareValues(e,n=!1){e||(e={});const i=Object.keys(this.value),o=n?new window.FormData:{};return i.forEach(u=>{const l=this.value[u].default||null;if(e[u]||l){const f=this.value[u].renameTo||null||u;let a=e[u]||l;const g=this.value[u].type||null;if(g&&a!==null&&typeof a!==void 0)if(g==="string"&&typeof a!="string")a=T.toString(a);else if(g==="number"&&typeof a!="number")a=Number(a);else{if(g==="boolean"&&typeof a!="boolean")throw new Error(`Param '${u}' must be of type boolean. '${a}' received`);if(g==="array"&&!Array.isArray(a))throw new Error(`Param '${u}' must be a valid array. '${a}' received`);if(g==="object"&&typeof a!="object")throw new Error(`Param '${u}' must be a valid object. '${a}' received`)}n?o.append(f,a):o[f]=a}}),o}replaceUrlValues(e,n){const i=this.prepareValues(n,!1);return T.fill(e,i,P.RESOURCE_PARAM_LEFT_SEPARATOR,P.RESOURCE_PARAM_RIGHT_SEPARATOR)}}class I{constructor(e){s(this,"value");if(e==="")throw new Error("A resource must have a valid url");this.value=e}prepare(e){return e?`${e}${this.value}`:this.value}}class G{constructor(e){s(this,"value");typeof e!="function"&&(e=void 0),this.value=e}hasActionDefined(){return typeof this.value=="function"}run(e){return this.value(e)}}class q{constructor(e){s(this,"value");e||(e=!1),this.value=e}}class J{constructor(e){s(this,"value");e||(e=""),this.value=e}hasToDig(){return this.value!==""}dig(e){return R.fetchInObject(e,this.value)}}class B{constructor(e){s(this,"value");e||(e=[200,201,202]),this.value=e}includes(e){return this.value.includes(e)}}class K{constructor(e,n,i,o,u,l){s(this,"url");s(this,"method");s(this,"data");s(this,"auth");s(this,"statusValidator");s(this,"headers");this.url=e,this.method=n,this.data=i,this.auth=o,this.statusValidator=u,this.headers=l}}class W{constructor(e){s(this,"value");e||(e=""),this.value=e}hasToDig(){return this.value!==""}dig(e){return R.fetchInObject(e,this.value)}}class z{constructor(e){s(this,"value");e||(e=""),this.value=e}hasToDig(){return this.value!==""}dig(e){return R.fetchInObject(e,this.value)}}class E{constructor(e){s(this,"data");s(this,"url");s(this,"name");s(this,"method");s(this,"environment");s(this,"dataType");s(this,"params");s(this,"isFileUpload");s(this,"validStatuses");s(this,"fetchStatus");s(this,"onSuccess");s(this,"returnsFullResponse");s(this,"returnsResponseDig");s(this,"maxPageDig");s(this,"permDig");s(this,"modificationsDig");this.data=e,this.url=new I(e.url),this.name=new y(e.name),this.method=new $(e.method),this.environment=new C(e.environment),this.dataType=new x(e.dataType),this.params=new N(e.params),this.isFileUpload=new F(e.isFileUpload),this.validStatuses=new B(e.validStatuses),this.fetchStatus=new M,this.onSuccess=new G(e.onSuccess),this.returnsFullResponse=new q(e.returnsFullResponse),this.returnsResponseDig=new J(e.digToData),this.maxPageDig=new L(e.digToMaxPage),this.permDig=new W(e.digToPerms),this.modificationsDig=new z(e.digToModifications)}build(e){let n=this.params.prepareValues(e,this.isFileUpload.value);const i=this.url.prepare(this.environment.getUrl());let o=this.params.replaceUrlValues(i,e);if(this.method.hasUrlParams()){const h=j(n);h.length>0&&(o=[o,h].join("?")),n={}}const u=h=>this.validStatuses.includes(h);let l;return this.isFileUpload.value&&(l={"Content-Type":"multipart/form-data"}),new K(o,this.method.toPrimitive(),n,this.environment.getAuth(),u,l)}async call(e){const n=this.build(e);if(this.fetchStatus.inProgress())return d.successPromise();switch(n.method){case"get":case"post":case"put":case"delete":return this.fetchStatus.start(),await S.default(n).then(i=>{this.fetchStatus.stop();let o=this.returnsFullResponse.value?i:i.data,u=-1;this.maxPageDig.hasToDig()&&(u=this.maxPageDig.dig(o));let l;this.permDig.hasToDig()&&(l=this.permDig.dig(o));let h={};this.modificationsDig.hasToDig()&&(h=this.modificationsDig.dig(o)),this.returnsResponseDig.hasToDig()&&(o=this.returnsResponseDig.dig(o));const f={data:o,maxPage:u,perms:l,modifications:h,response:i};return this.onSuccess.hasActionDefined()?this.onSuccess.run(f):f}).catch(i=>(this.fetchStatus.stop(),Promise.reject(new Error(i))));case"download":case"open":return S.default.get(n.url,{responseType:"blob"}).then(i=>{const o=i.headers["content-disposition"];let u="";return o&&o.split(";").forEach(h=>{const f=h.split("=");if(T.trim(f[0])==="filename"){let a=T.trim(f[1]);a=T.trim(a,'"'),u=a}}),window.download(i.data,u),this.onSuccess.hasActionDefined()?this.onSuccess.run(i):i}).catch(i=>i);default:throw new Error(`Error: Invalid method in call ${JSON.stringify(n)}`)}}}const Q=t=>{const e={...t,method:"get"};return p(e)},X=t=>{const e={...t,method:"post"};return p(e)},Y=t=>{const e={...t,method:"put"};return p(e)},Z=t=>{const e={...t,method:"delete"};return p(e)},k=t=>{const e={...t,method:"open"};return p(e)},ee=t=>{const e={...t,method:"download"};return p(e)},p=t=>{const e=new E(t);return v().resources.add(e),A(t.name)},V=t=>{const e=new D(t.name,t.url,t.auth);return v().environments.add(e),w(t.name)},A=t=>v().resources.get(t),w=t=>v().environments.get(t),b=async(t="",e={})=>await A(t).call(e);class te{constructor(e){s(this,"value");e||(e=""),this.value=e}exists(){return v().resources.exists(this.value)}async call(e){return await b(this.value,e)}}class se{constructor(e){s(this,"value");e||(e={}),this.value=e}setParam(e,n){this.value[e]=n}getParams(){return this.value}}class re{constructor(e){s(this,"resource");s(this,"params");this.resource=new te(e.resource),this.params=new se(e.params)}isCallable(){return this.resource.exists()}setParam(e,n){this.params.setParam(e,n)}setParams(e){Object.keys(e).forEach(n=>{this.params.setParam(n,e[n])})}async call(){return this.isCallable()?await this.resource.call(this.params.getParams()):await d.successPromise()}}const ie={install:(t,e)=>{V({name:"default",url:""}),window.download=require("downloadjs")}};r.ResourceCaller=re,r.createHTTPDeleteResource=Z,r.createHTTPDownloadResource=ee,r.createHTTPEnvironment=V,r.createHTTPGetResource=Q,r.createHTTPOpenResource=k,r.createHTTPPostResource=X,r.createHTTPPutResource=Y,r.default=ie,r.existsHTTPResource=_,r.getHTTPEnvironment=w,r.getHTTPResource=A,r.getRouter=v,r.httpCall=b,Object.defineProperties(r,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
