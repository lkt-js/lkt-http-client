import { EnvironmentManager } from './EnvironmentManager';
import { ResourceManager } from './ResourceManager';
export declare class LktRouter {
    static router?: LktRouter;
    resources: ResourceManager;
    environments: EnvironmentManager;
    constructor();
    static DEFAULT_ENVIRONMENT: string;
}
