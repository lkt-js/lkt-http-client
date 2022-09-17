import {UserAuth} from "./UserAuth";

export type EnvironmentData = {
    url: string;
    name: string;
    auth?: UserAuth;
}