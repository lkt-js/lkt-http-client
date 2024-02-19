export class IsFileUploadValue {
    constructor(value) {
        if (!value) {
            value = false;
        }
        this.value = value;
    }
}
