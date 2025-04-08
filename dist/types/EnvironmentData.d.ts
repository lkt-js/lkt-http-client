import { UserAuth } from "./UserAuth";
import { LktObject } from "lkt-ts-interfaces";
export interface EnvironmentData {
    url: string;
    name: string;
    auth?: UserAuth;
    params?: LktObject;
    headers?: LktObject;
}
