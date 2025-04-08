import { LktObject } from 'lkt-ts-interfaces';
import { AxiosError, AxiosResponse } from 'axios';

export interface HTTPResponse {
  data: LktObject | any[]
  maxPage: number
  perms: string[]
  modifications: LktObject
  response: AxiosResponse | AxiosError | undefined
  success: boolean
  httpStatus: number
  autoReloadId: number|string
  custom: LktObject
  contentType: string
  validationCode: string
  validationMessage: string
  validationData: LktObject
}
