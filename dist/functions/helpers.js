import { LktRouter } from '../classes/LktRouter';
export const paramsToString = (params) => {
    const r = [];
    const keys = Object.keys(params);
    keys.forEach((key) => {
        if (Array.isArray(params[key])) {
            if (params[key].length > 0) {
                r.push(`${key}=${JSON.stringify(params[key])}`);
            }
        }
        else {
            r.push(`${key}=${params[key]}`);
        }
    });
    return r.join('&');
};
/**
 *
 * @param name
 */
export const existsHTTPResource = (name) => {
    return LktRouter.resources.exists(name);
};
