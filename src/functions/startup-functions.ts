import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { EnvironmentData } from '../types/EnvironmentData';
import { ResourceConfig } from '../config/ResourceConfig';
import { LktRouter } from '../classes/LktRouter';
import { ResourceMethod } from '../enums/ResourceMethod';

export const createHTTPGetResource = (data: ResourceConfig) => {
  const mix: ResourceConfig = { ...data, method: ResourceMethod.Get };
  return createHTTPResource(mix);
};

export const createHTTPPostResource = (data: ResourceConfig) => {
  const mix: ResourceConfig = {...data, method: ResourceMethod.Post};
  return createHTTPResource(mix);
};

export const createHTTPPutResource = (data: ResourceConfig) => {
  const mix: ResourceConfig = {...data, method: ResourceMethod.Put};
  return createHTTPResource(mix);
};

export const createHTTPDeleteResource = (data: ResourceConfig) => {
  const mix: ResourceConfig = {...data, method: ResourceMethod.Delete};
  return createHTTPResource(mix);
};

export const createHTTPOpenResource = (data: ResourceConfig) => {
  const mix: ResourceConfig = {...data, method: ResourceMethod.Open};
  return createHTTPResource(mix);
};

export const createHTTPDownloadResource = (data: ResourceConfig) => {
  const mix: ResourceConfig = {...data, method: ResourceMethod.Download};
  return createHTTPResource(mix);
};

/**
 *
 * @param data
 */
export const createHTTPResource = (data: ResourceConfig): LktResource|undefined => {
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
