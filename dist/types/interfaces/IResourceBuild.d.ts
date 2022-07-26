import { ILktObject } from "lkt-tools";
import { IAuth } from "./IAuth";
export interface IResourceBuild {
    url: string;
    method: string;
    data: ILktObject;
    auth?: IAuth;
    validateStatus: Function;
    headers: ILktObject;
}
