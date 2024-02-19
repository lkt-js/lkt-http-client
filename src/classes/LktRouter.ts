import { EnvironmentManager } from './EnvironmentManager';
import { ResourceManager } from './ResourceManager';

export class LktRouter {
  static router?: LktRouter;

  resources: ResourceManager;
  environments: EnvironmentManager;

  constructor() {
    this.resources = new ResourceManager();
    this.environments = new EnvironmentManager();
  }

  static DEFAULT_ENVIRONMENT: string = '';
}
