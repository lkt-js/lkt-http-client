import { LktObject } from 'lkt-ts-interfaces';

export type DataMapper = (data: LktObject|Array<LktObject>) => LktObject;
