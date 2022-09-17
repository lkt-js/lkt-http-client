import {ResourceMethod} from "../types/ResourceMethod";

export class ResourceMethodValue {
    public readonly value: ResourceMethod;

    constructor(value?: ResourceMethod) {
        if (!value) {
            throw new Error("A resource must have a valid method");
        }
        this.value = value;
    }

    toPrimitive(): ResourceMethod {
        return this.value.toLowerCase() as ResourceMethod;
    }

    isGET(): boolean {
        return this.value === 'get';
    }

    isPOST(): boolean {
        return this.value === 'post';
    }

    isPUT(): boolean {
        return this.value === 'put';
    }

    isDELETE(): boolean {
        return this.value === 'delete';
    }

    isOPEN(): boolean {
        return this.value === 'open';
    }

    isDOWNLOAD(): boolean {
        return this.value === 'download';
    }

    hasUrlParams() {
        return this.isGET() || this.isOPEN();
    }
}