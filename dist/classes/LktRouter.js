import { LktEnvironment } from './LktEnvironment';
import { LktResource } from './LktResource';
export class LktRouter {
    static hasResource(name) {
        return LktRouter.resources[name] instanceof LktResource;
    }
    static getResource(name) {
        if (LktRouter.resources[name] instanceof LktResource) {
            return LktRouter.resources[name];
        }
        return undefined;
    }
    static addResource(resource) {
        LktRouter.resources[resource.name.value] = resource;
    }
    static hasEnvironment(name) {
        return LktRouter.environments[name] instanceof LktResource;
    }
    static getEnvironment(name) {
        if (LktRouter.environments[name] instanceof LktEnvironment) {
            return LktRouter.environments[name];
        }
        return undefined;
    }
    static addEnvironment(environment) {
        LktRouter.environments[environment.name.value] = environment;
    }
}
LktRouter.resources = {};
LktRouter.environments = {
    'default': new LktEnvironment('default', ''),
};
