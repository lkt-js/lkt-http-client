export class ResourceUrlValue {
    constructor(value) {
        if (value === '') {
            throw new Error('A resource must have a valid url');
        }
        this.value = value;
    }
    prepare(parentPath) {
        if (parentPath) {
            return `${parentPath}${this.value}`;
        }
        return this.value;
    }
}
