import { LktObject } from 'lkt-ts-interfaces';

import { LktRouter } from '../classes/LktRouter';

export const paramsToString = (params: LktObject) => {
  const r: string[] = [];
  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (Array.isArray(params[key])) {
      if (params[key].length > 0) {
        r.push(`${key}=${JSON.stringify(params[key])}`);
      }
    } else {
      r.push(`${key}=${params[key]}`);
    }
  });

  return r.join('&');
};

/**
 *
 * @param name
 */
export const existsHTTPResource = (name: string): boolean => {
    return getRouter().resources.exists(name);
}

export const getRouter = () => {
  if (!(LktRouter.router instanceof LktRouter)) {
    LktRouter.router = new LktRouter();
  }

  return LktRouter.router;

}