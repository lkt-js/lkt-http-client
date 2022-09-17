export class ResourceFetchStatus {
  private value: boolean;

  constructor(value: boolean = false) {
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
