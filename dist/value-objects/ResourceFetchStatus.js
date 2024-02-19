export class ResourceFetchStatus {
    constructor(value = false) {
        this.value = value;
    }
    inProgress() {
        return this.value;
    }
    start() {
        this.value = true;
    }
    stop() {
        this.value = false;
    }
}
