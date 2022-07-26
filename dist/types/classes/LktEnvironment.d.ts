import { IAuth } from "../interfaces/IAuth";
export declare class LktEnvironment {
    name: string;
    url: string;
    auth: IAuth;
    constructor(name: string, url: string, auth?: IAuth);
}
