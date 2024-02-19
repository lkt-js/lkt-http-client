export class ReturnsFullResponseValue {
    constructor(value) {
        if (!value) {
            value = false;
        }
        this.value = value;
    }
}
