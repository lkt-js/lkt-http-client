import { LktEnvironment } from './LktEnvironment';
import { LktResource } from './LktResource';
export declare class LktRouter {
    private static resources;
    private static environments;
    static hasResource(name: string): boolean;
    static getResource(name: string): LktResource | undefined;
    static addResource(resource: LktResource): void;
    static hasEnvironment(name: string): boolean;
    static getEnvironment(name: string): LktEnvironment | undefined;
    static addEnvironment(environment: LktEnvironment): void;
}
