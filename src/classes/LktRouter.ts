import {RouterType} from "../types/RouterType";
import {ResourceManager} from "./ResourceManager";
import {EnvironmentManager} from "./EnvironmentManager";
import {LktEnvironment} from "./LktEnvironment";

let environments = new EnvironmentManager();
environments.add(new LktEnvironment('default', ''));
export const LktRouter: RouterType = {
  resources: new ResourceManager(),
  environments,
}
