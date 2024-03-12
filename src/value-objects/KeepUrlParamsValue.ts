export class KeepUrlParamsValue {
    public readonly value: boolean;

    constructor(value?: boolean) {
        if (!value) {
            value = false;
        }
        this.value = value;
    }

    keepValues() {
        return this.value;
    }
}