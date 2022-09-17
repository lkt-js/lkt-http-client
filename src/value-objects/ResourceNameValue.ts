export class ResourceNameValue {
    public readonly value: string;

    constructor(value: string) {
        if (value === '') {
            throw new Error("A resource must have a valid name");
        }
        this.value = value;
    }
}