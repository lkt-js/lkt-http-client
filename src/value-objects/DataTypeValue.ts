export class DataTypeValue {
    public readonly value: string;

    constructor(value?: string) {
        if (!value) {
            value = 'json';
        }
        this.value = value;
    }

    isJSON(): boolean {
        return this.value === 'json';
    }
}