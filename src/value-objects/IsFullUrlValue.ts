export class IsFullUrlValue {
    public readonly value: boolean;

    constructor(value?: boolean) {
        if (!value) value = false;
        this.value = value;
    }
}