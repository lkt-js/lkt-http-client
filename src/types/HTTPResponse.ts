import { LktObject } from 'lkt-ts-interfaces';
import { AxiosError, AxiosResponse } from 'axios';
import { Notification } from '../interfaces/Notification';

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
  toast?: LktObject|undefined
  newestDate?: Date|undefined
  oldestDate?: Date|undefined
  notifications?: Array<Notification>
}
