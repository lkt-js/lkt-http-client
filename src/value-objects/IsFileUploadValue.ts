export class IsFileUploadValue {
    public readonly value: boolean;

    constructor(value?: boolean) {
        if (!value) {
            value = false;
        }
        this.value = value;
    }
}