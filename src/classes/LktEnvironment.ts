import { UserAuth } from '../types/UserAuth';
import {ResourceNameValue} from "../value-objects/ResourceNameValue";
import {ResourceUrlValue} from "../value-objects/ResourceUrlValue";

export class LktEnvironment {
  name: ResourceNameValue;
  url: ResourceUrlValue;
  auth: UserAuth;

  constructor(name: string, url: string, auth?: UserAuth) {
    this.name = new ResourceNameValue(name);
    this.url = new ResourceUrlValue(url);
    this.auth = auth;
  }
}