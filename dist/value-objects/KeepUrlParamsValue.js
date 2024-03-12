export class KeepUrlParamsValue {
    constructor(value) {
        if (!value) {
            value = false;
        }
        this.value = value;
    }
    keepValues() {
        return this.value;
    }
}
