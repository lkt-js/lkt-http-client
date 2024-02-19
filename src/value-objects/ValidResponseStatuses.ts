export class ValidResponseStatuses {
    public readonly value: number[];

    constructor(value: number[]|undefined) {
        if (!value) {
            value = [200, 201, 202];
        }
        this.value = value;
    }

    includes(code: number) {
        return this.value.includes(code);
    }
}