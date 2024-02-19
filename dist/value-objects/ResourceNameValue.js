export class ResourceNameValue {
    constructor(value) {
        if (value === '') {
            throw new Error("A resource must have a valid name");
        }
        this.value = value;
    }
}
