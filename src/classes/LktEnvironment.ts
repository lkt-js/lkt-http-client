import { UserAuth } from '../types/UserAuth';
import { EnvironmentUrlValue } from '../value-objects/EnvironmentUrlValue';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';

export class LktEnvironment {
  name: ResourceNameValue;
  url: EnvironmentUrlValue;
  auth: UserAuth;

  constructor(name: string, url: string, auth?: UserAuth) {
    this.name = new ResourceNameValue(name);
    this.url = new EnvironmentUrlValue(url);
    this.auth = auth;
  }
}