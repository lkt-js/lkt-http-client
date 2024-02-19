export class ResourceCallDataValue {
    constructor(value) {
        if (!value) {
            value = {};
        }
        this.value = value;
    }
    setParam(key, value) {
        this.value[key] = value;
    }
    getParams() {
        return this.value;
    }
}
