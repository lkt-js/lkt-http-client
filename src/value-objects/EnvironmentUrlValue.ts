export class EnvironmentUrlValue {
  public readonly value: string;

  constructor(value: string) {
    if (!value) {
      value = '';
    }
    this.value = value;
  }
}
