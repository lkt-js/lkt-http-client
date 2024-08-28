import {fetchInObject} from "lkt-object-tools";
import {LktObject} from "lkt-ts-interfaces";

export class ValidationCodeDigValue {
    public readonly value: string;

    constructor(value?: string) {
        if (!value) value = '';
        this.value = value;
    }

    hasToDig(): boolean {
        return this.value !== '';
    }

    dig(data: LktObject): string {
        return fetchInObject(data, this.value) as unknown as string;
    }
}