import { LktObject } from 'lkt-ts-interfaces';

import { ResourceParamStack } from '../interfaces/ResourceParamStack';
import { ResourceDataType } from '../types/ResourceDataType';
import { ResourceMethod } from '../enums/ResourceMethod';
import { StatusValidator } from '../types/StatusValidator';
import { DataMapper } from '../types/DataMapper';
import { ModificationHandleType } from '../enums/ModificationHandleType';

export interface ResourceConfig {
  url: string
  name: string
  method?: ResourceMethod
  headers?: LktObject
  dataType?: ResourceDataType
  isFileUpload?: boolean
  validStatuses?: number[]
  validateStatus?: StatusValidator
  environment?: string
  params?: ResourceParamStack
  returnsFullResponse?: boolean
  isFullUrl?: boolean
  keepUrlParams?: boolean
  onSuccess?: Function
  mapData?: DataMapper
  digToData?: string
  digToMaxPage?: string
  digToPerms?: string
  digToModifications?: string
  digToAutoReloadId?: string
  digToValidationCode?: string
  digToValidationMessage?: string
  digToValidationData?: string
  digToRedirect?: string
  custom?: LktObject
  modificationHandleType?: ModificationHandleType
}
