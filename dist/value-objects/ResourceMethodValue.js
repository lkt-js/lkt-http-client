export class ResourceMethodValue {
    constructor(value) {
        if (!value) {
            value = 'get';
        }
        this.value = value;
    }
    toPrimitive() {
        return this.value.toLowerCase();
    }
    isGET() {
        return this.value === 'get';
    }
    isPOST() {
        return this.value === 'post';
    }
    isPUT() {
        return this.value === 'put';
    }
    isDELETE() {
        return this.value === 'delete';
    }
    isOPEN() {
        return this.value === 'open';
    }
    isDOWNLOAD() {
        return this.value === 'download';
    }
    hasUrlParams() {
        return this.isGET() || this.isOPEN() || this.isDOWNLOAD();
    }
}
