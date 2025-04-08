import { ResourceMethod } from '../enums/ResourceMethod';

export class ResourceMethodValue {
    public readonly value: ResourceMethod;

    constructor(value?: ResourceMethod) {
        if (!value) {
            value = ResourceMethod.Get;
        }
        this.value = value;
    }

    toPrimitive(): ResourceMethod {
        return this.value.toLowerCase() as ResourceMethod;
    }

    isGET(): boolean {
        return this.value === ResourceMethod.Get;
    }

    isPOST(): boolean {
        return this.value === ResourceMethod.Post;
    }

    isPUT(): boolean {
        return this.value === ResourceMethod.Put;
    }

    isDELETE(): boolean {
        return this.value === ResourceMethod.Delete;
    }

    isOPEN(): boolean {
        return this.value === ResourceMethod.Open;
    }

    isDOWNLOAD(): boolean {
        return this.value === ResourceMethod.Download;
    }

    hasUrlParams() {
        return this.isGET() || this.isOPEN() || this.isDOWNLOAD();
    }
}