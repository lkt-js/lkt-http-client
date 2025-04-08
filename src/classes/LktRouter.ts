import { LktEnvironment } from './LktEnvironment';
import { ResourceStack } from '../interfaces/ResourceStack';
import { EnvironmentStack } from '../interfaces/EnvironmentStack';
import { LktResource } from './LktResource';

export class LktRouter {
  private static resources: ResourceStack = {};
  private static environments: EnvironmentStack = {
    'default': new LktEnvironment('default', ''),
  };

  static hasResource(name: string) {
    return LktRouter.resources[name] instanceof LktResource;
  }

  static getResource(name: string) {
    if (LktRouter.resources[name] instanceof LktResource) {
      return LktRouter.resources[name];
    }
    return undefined;
  }

  static addResource(resource: LktResource) {
    LktRouter.resources[resource.name.value] = resource;
  }

  static hasEnvironment(name: string) {
    return LktRouter.environments[name] instanceof LktResource;
  }

  static getEnvironment(name: string) {
    if (LktRouter.environments[name] instanceof LktEnvironment) {
      return LktRouter.environments[name];
    }
    return undefined;
  }

  static addEnvironment(environment: LktEnvironment) {
    LktRouter.environments[environment.name.value] = environment;
  }
}