import { LktObject } from 'lkt-ts-interfaces';

import { ResourceMethod } from '../enums/ResourceMethod';
import { StatusValidator } from '../types/StatusValidator';
import { UserAuth } from '../types/UserAuth';

export class ResourceBuild {
  public readonly url: string;
  public readonly method: ResourceMethod;
  public readonly data: LktObject;
  public readonly auth: UserAuth;
  public readonly statusValidator: StatusValidator;
  public readonly headers: LktObject;

  constructor(
    url: string,
    method: ResourceMethod,
    data: LktObject,
    auth: UserAuth,
    statusValidator: StatusValidator,
    headers: LktObject
  ) {
    this.url = url;
    this.method = method;
    this.data = data;
    if (Object.keys(auth).length > 0)
    this.auth = auth;
    this.statusValidator = statusValidator;
    this.headers = headers;
  }
}
