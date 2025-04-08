import { httpCall } from '../functions/http-functions';
import { LktRouter } from "../classes/LktRouter";
export class ResourceAliasValue {
    constructor(value) {
        if (!value) {
            value = '';
        }
        this.value = value;
    }
    exists() {
        return LktRouter.hasResource(this.value);
    }
    async call(params) {
        return await httpCall(this.value, params);
    }
}
