import { ResourceMethod } from '../enums/ResourceMethod';
export class ResourceMethodValue {
    constructor(value) {
        if (!value) {
            value = ResourceMethod.Get;
        }
        this.value = value;
    }
    toPrimitive() {
        return this.value.toLowerCase();
    }
    isGET() {
        return this.value === ResourceMethod.Get;
    }
    isPOST() {
        return this.value === ResourceMethod.Post;
    }
    isPUT() {
        return this.value === ResourceMethod.Put;
    }
    isDELETE() {
        return this.value === ResourceMethod.Delete;
    }
    isOPEN() {
        return this.value === ResourceMethod.Open;
    }
    isDOWNLOAD() {
        return this.value === ResourceMethod.Download;
    }
    hasUrlParams() {
        return this.isGET() || this.isOPEN() || this.isDOWNLOAD();
    }
}
