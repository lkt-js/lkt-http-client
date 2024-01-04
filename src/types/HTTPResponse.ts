import {LktObject} from 'lkt-ts-interfaces';
import {AxiosError, AxiosResponse} from "axios";

export type HTTPResponse = {
  data: LktObject;
  maxPage: number;
  perms: string[];
  modifications: LktObject;
  response: AxiosResponse | AxiosError;
  success: boolean;
  httpStatus: number;
  autoReloadId: number|string;
};
