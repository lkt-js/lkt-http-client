import {AxiosResponse} from "axios";

export class ResponseSuccessHookValue {
    private readonly value?: any;

    constructor(value?: any) {
        if (typeof value !== 'function') {
            value = undefined;
        }
        this.value = value;
    }

    hasActionDefined() {
        return typeof this.value === 'function';
    }

    run(axiosResponse: AxiosResponse) {
        return this.value(axiosResponse);
    }
}