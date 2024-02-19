import { getRouter } from '../functions/helpers';
import { httpCall } from '../functions/http-functions';
export class ResourceAliasValue {
    constructor(value) {
        if (!value) {
            value = '';
        }
        this.value = value;
    }
    exists() {
        return getRouter().resources.exists(this.value);
    }
    async call(params) {
        return await httpCall(this.value, params);
    }
}
