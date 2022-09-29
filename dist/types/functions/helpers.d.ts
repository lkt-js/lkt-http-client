import { LktObject } from 'lkt-ts-interfaces';
import { LktRouter } from '../classes/LktRouter';
export declare const paramsToString: (params: LktObject) => string;
/**
 *
 * @param name
 */
export declare const existsHTTPResource: (name: string) => boolean;
export declare const getRouter: () => LktRouter;
