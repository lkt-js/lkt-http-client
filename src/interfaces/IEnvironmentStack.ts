import {LktEnvironment} from "../classes/LktEnvironment";

export interface IEnvironmentStack {
    [key: string]: LktEnvironment;
}