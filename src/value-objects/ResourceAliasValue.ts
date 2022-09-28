import {LktRouter} from "../classes/LktRouter";
import {httpCall} from "../functions/http-functions";
import {ResourceParamStack} from "../interfaces/ResourceParamStack";

export class ResourceAliasValue {
    private readonly value: string;

    constructor(value?: string) {
        if (!value) {
            value = '';
        }
        this.value = value;
    }

    exists() {
        return LktRouter.existsResource(this.value)
    }

    call(params: ResourceParamStack) {
        return httpCall(this.value, params);
    }
}