export class DataTypeValue {
    constructor(value) {
        if (!value) {
            value = 'json';
        }
        this.value = value;
    }
    isJSON() {
        return this.value === 'json';
    }
}
