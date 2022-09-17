import {LktEnvironment} from "../classes/LktEnvironment";

export interface EnvironmentStack {
    [key: string]: LktEnvironment;
}