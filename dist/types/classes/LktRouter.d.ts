import { EnvironmentStack } from '../interfaces/EnvironmentStack';
import { ResourceStack } from '../interfaces/ResourceStack';
import { LktEnvironment } from './LktEnvironment';
import { LktResource } from './LktResource';
export declare class LktRouter {
    static RESOURCES: ResourceStack;
    static ENVIRONMENTS: EnvironmentStack;
    static DEFAULT_ENVIRONMENT: string;
    /**
     *
     * @param resource
     */
    static addResource(resource: LktResource): void;
    /**
     *
     * @param environment
     * @returns {LktRouter}
     */
    static addEnvironment(environment: LktEnvironment): void;
    /**
     *
     * @param name
     */
    static getResource: (name: string) => LktResource;
    static existsResource: (name: string) => boolean;
    /**
     *
     * @param name
     */
    static getEnvironment(name: string): LktEnvironment;
}
