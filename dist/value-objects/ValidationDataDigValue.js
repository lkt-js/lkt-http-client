import { fetchInObject } from "lkt-object-tools";
export class ValidationDataDigValue {
    constructor(value) {
        if (!value)
            value = '';
        this.value = value;
    }
    hasToDig() {
        return this.value !== '';
    }
    dig(data) {
        return fetchInObject(data, this.value);
    }
}
