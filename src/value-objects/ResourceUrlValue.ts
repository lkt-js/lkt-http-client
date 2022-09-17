export class ResourceUrlValue {
  public readonly value: string;

  constructor(value: string) {
    if (value === '') {
      throw new Error('A resource must have a valid url');
    }
    this.value = value;
  }

  prepare(parentPath: string) {
    if (parentPath) {
      return `${parentPath}${this.value}`;
    }
    return this.value;
  }
}
