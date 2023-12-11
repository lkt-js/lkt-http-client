import { LktObject } from 'lkt-ts-interfaces';
import { AxiosResponse } from "axios";
export type HTTPResponse = {
    data: LktObject;
    maxPage: number;
    perms: string[];
    modifications: LktObject;
    response: AxiosResponse;
};
