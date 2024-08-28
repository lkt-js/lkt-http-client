import {fetchInObject} from "lkt-object-tools";
import {LktObject} from "lkt-ts-interfaces";

export class ValidationDataDigValue {
    public readonly value: string;

    constructor(value?: string) {
        if (!value) value = '';
        this.value = value;
    }

    hasToDig(): boolean {
        return this.value !== '';
    }

    dig(data: LktObject): LktObject {
        return fetchInObject(data, this.value) as unknown as LktObject;
    }
}