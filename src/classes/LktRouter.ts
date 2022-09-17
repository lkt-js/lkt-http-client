import { EnvironmentStack } from '../interfaces/EnvironmentStack';
import { ResourceStack } from '../interfaces/ResourceStack';
import { LktEnvironment } from './LktEnvironment';
import { LktResource } from './LktResource';

export class LktRouter {
  static RESOURCES: ResourceStack = {};
  static ENVIRONMENTS: EnvironmentStack = {};
  static DEFAULT_ENVIRONMENT: string = undefined;

  /**
   *
   * @param resource
   */
  static addResource(resource: LktResource) {
    LktRouter.RESOURCES[resource.name.value] = resource;
  }

  /**
   *
   * @param environment
   * @returns {LktRouter}
   */
  static addEnvironment(environment: LktEnvironment) {
    if (typeof LktRouter.DEFAULT_ENVIRONMENT === 'undefined') {
      LktRouter.DEFAULT_ENVIRONMENT = environment.name.value;
    }
    LktRouter.ENVIRONMENTS[environment.name.value] = environment;
  }

  /**
   *
   * @param name
   */
  static getResource = (name: string) => {
    if (LktRouter.RESOURCES[name] instanceof LktResource) {
      return LktRouter.RESOURCES[name];
    }
    return undefined;
  };

  /**
   *
   * @param name
   */
  static getEnvironment(name: string) {
    if (LktRouter.ENVIRONMENTS[name] instanceof LktEnvironment) {
      return LktRouter.ENVIRONMENTS[name];
    }
    return undefined;
  }
}
