import { EnvironmentStack } from '../interfaces/EnvironmentStack';
import { LktEnvironment } from './LktEnvironment';
export declare class EnvironmentManager {
    value: EnvironmentStack;
    add(environment: LktEnvironment): void;
    get(name: string): LktEnvironment | undefined;
    exists(name: string): boolean;
}
