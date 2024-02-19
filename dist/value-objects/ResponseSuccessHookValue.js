export class ResponseSuccessHookValue {
    constructor(value) {
        if (typeof value !== 'function') {
            value = undefined;
        }
        this.value = value;
    }
    hasActionDefined() {
        return typeof this.value === 'function';
    }
    run(response) {
        return this.value(response);
    }
}
