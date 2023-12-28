import {LktObject} from "lkt-ts-interfaces";

export class MapDataValue {
    private readonly value?: any;

    constructor(value?: any) {
        if (typeof value !== 'function') {
            value = undefined;
        }
        this.value = value;
    }

    hasActionDefined() {
        return typeof this.value === 'function';
    }

    run(data: LktObject) {
        return this.value(data);
    }
}