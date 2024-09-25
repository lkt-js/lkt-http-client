export class MapDataValue {
    constructor(value) {
        if (typeof value !== 'function') {
            value = undefined;
        }
        this.value = value;
    }
    hasActionDefined() {
        return typeof this.value === 'function';
    }
    run(data, props) {
        return this.value(data, props);
    }
}
