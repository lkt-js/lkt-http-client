import { fetchInObject } from 'lkt-object-tools';
import { LktObject } from 'lkt-ts-interfaces';
import { ymdToDate } from 'lkt-date-tools';

export class DigToDateValue {
    public readonly value: string;

    constructor(value?: string) {
        if (!value) value = '';
        this.value = value;
    }

    hasToDig(): boolean {
        return this.value !== '';
    }

    dig(data: LktObject): Date | undefined {
        let needle = fetchInObject(data, this.value) as unknown;
        if (typeof needle === 'string') {
            let r = ymdToDate(needle);
            if (!r) return undefined;
            return r;
        }
        return undefined;
    }
}