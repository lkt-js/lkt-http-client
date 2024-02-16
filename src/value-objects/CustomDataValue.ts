import {LktObject} from "lkt-ts-interfaces";
import {fetchInObject} from "lkt-object-tools";

export class CustomDataValue {
    public readonly value: LktObject;

    constructor(value?: LktObject) {
        if (!value) {
            value = {};
        }
        this.value = value;
    }

    hasToDig(): boolean {
        return Object.keys(this.value).length > 0;
    }

    dig(data: LktObject): LktObject {
        let r: LktObject = {};
        for (let k in this.value) {
            r[k] = fetchInObject(data, this.value[k]);
        }
        return r;
    }
}