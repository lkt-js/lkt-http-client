import { EnvironmentStack } from '../interfaces/EnvironmentStack';
import { LktEnvironment } from './LktEnvironment';

export class EnvironmentManager {
  value: EnvironmentStack = {};

  add(environment: LktEnvironment) {
    this.value[environment.name.value] = environment;
  }

  get(name: string) {
    if (this.value[name] instanceof LktEnvironment) {
      return this.value[name];
    }
    return undefined;
  }

  exists(name: string): boolean {
    return this.value[name] instanceof LktEnvironment;
  }
}