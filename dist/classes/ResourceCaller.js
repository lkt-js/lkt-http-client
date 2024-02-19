import { successPromise } from 'lkt-control-tools';
import { ResourceAliasValue } from '../value-objects/ResourceAliasValue';
import { ResourceCallDataValue } from '../value-objects/ResourceCallDataValue';
export class ResourceCaller {
    constructor(config) {
        this.resource = new ResourceAliasValue(config.resource);
        this.params = new ResourceCallDataValue(config.params);
    }
    isCallable() {
        return this.resource.exists();
    }
    setParam(key, value) {
        this.params.setParam(key, value);
    }
    setParams(params) {
        Object.keys(params).forEach(key => {
            this.params.setParam(key, params[key]);
        });
    }
    async call() {
        if (this.isCallable()) {
            return await this.resource.call(this.params.getParams());
        }
        return await successPromise(undefined, undefined);
    }
}
