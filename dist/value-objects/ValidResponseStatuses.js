export class ValidResponseStatuses {
    constructor(value) {
        if (!value) {
            value = [200, 201, 202];
        }
        this.value = value;
    }
    includes(code) {
        return this.value.includes(code);
    }
}
