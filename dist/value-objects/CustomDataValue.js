import { fetchInObject } from "lkt-object-tools";
export class CustomDataValue {
    constructor(value) {
        if (!value) {
            value = {};
        }
        this.value = value;
    }
    hasToDig() {
        return Object.keys(this.value).length > 0;
    }
    dig(data) {
        let r = {};
        for (let k in this.value) {
            r[k] = fetchInObject(data, this.value[k]);
        }
        return r;
    }
}
