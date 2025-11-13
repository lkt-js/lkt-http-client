import {fetchInObject} from "lkt-object-tools";
import {LktObject} from "lkt-ts-interfaces";

export class DigToToastValue {
    public readonly value: string;

    constructor(value?: string) {
        if (!value) value = '';
        this.value = value;
    }

    hasToDig(): boolean {
        return this.value !== '';
    }

    dig(data: LktObject): LktObject|undefined {
        let r = fetchInObject(data, this.value);
        if (typeof r === 'object') return r  as unknown as LktObject;
        return undefined;
    }
}