import {IAuth} from "../interfaces/IAuth";

export class LktEnvironment {

    name: string;
    url: string;
    auth: IAuth;

    constructor (name: string, url: string, auth?: IAuth){
        this.name = name;
        this.url = url;
        this.auth = auth;
    }
}