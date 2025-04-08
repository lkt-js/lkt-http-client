import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { EnvironmentData } from '../types/EnvironmentData';
import { ResourceData } from '../types/ResourceData';
import { LktRouter } from '../classes/LktRouter';
import { ResourceMethod } from '../enums/ResourceMethod';

export const createHTTPGetResource = (data: ResourceData) => {
  const mix: ResourceData = { ...data, method: ResourceMethod.Get };
  return createHTTPResource(mix);
};

export const createHTTPPostResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: ResourceMethod.Post};
  return createHTTPResource(mix);
};

export const createHTTPPutResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: ResourceMethod.Put};
  return createHTTPResource(mix);
};

export const createHTTPDeleteResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: ResourceMethod.Delete};
  return createHTTPResource(mix);
};

export const createHTTPOpenResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: ResourceMethod.Open};
  return createHTTPResource(mix);
};

export const createHTTPDownloadResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: ResourceMethod.Download};
  return createHTTPResource(mix);
};

/**
 *
 * @param data
 */
export const createHTTPResource = (data: ResourceData): LktResource|undefined => {
  const r = new LktResource(data);
  LktRouter.addResource(r);
  return getHTTPResource(data.name);
};

/**
 *
 * @param data
 */
export const createHTTPEnvironment = (
  data: EnvironmentData
): LktEnvironment|undefined => {
  const r = new LktEnvironment(data.name, data.url, data.auth, data.params, data.headers);
  LktRouter.addEnvironment(r);
  return getHTTPEnvironment(data.name);
};

/**
 *
 * @param resource
 */
export const getHTTPResource = (resource: string) => {
  return LktRouter.getResource(resource);
};

/**
 *
 * @param environment
 */
export const getHTTPEnvironment = (environment: string) => {
  return LktRouter.getEnvironment(environment);
};
