import { EnvironmentManager } from './EnvironmentManager';
import { ResourceManager } from './ResourceManager';
export class LktRouter {
    constructor() {
        this.resources = new ResourceManager();
        this.environments = new EnvironmentManager();
    }
}
LktRouter.DEFAULT_ENVIRONMENT = '';
