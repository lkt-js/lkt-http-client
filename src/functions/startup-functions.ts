import { LktEnvironment } from '../classes/LktEnvironment';
import { LktResource } from '../classes/LktResource';
import { LktRouter } from '../classes/LktRouter';
import { EnvironmentData } from '../types/EnvironmentData';
import { ResourceData } from '../types/ResourceData';

export const createHTTPGetResource = (data: ResourceData) => {
  const mix: ResourceData = { ...data, method: 'get' };
  return createHTTPResource(mix);
};

export const createHTTPPostResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: 'post'};
  return createHTTPResource(mix);
};

export const createHTTPPutResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: 'put'};
  return createHTTPResource(mix);
};

export const createHTTPDeleteResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: 'delete'};
  return createHTTPResource(mix);
};

export const createHTTPOpenResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: 'open'};
  return createHTTPResource(mix);
};

export const createHTTPDownloadResource = (data: ResourceData) => {
  const mix: ResourceData = {...data, method: 'download'};
  return createHTTPResource(mix);
};

/**
 *
 * @param data
 */
export const createHTTPResource = (data: ResourceData): LktResource => {
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
): LktEnvironment => {
  const r = new LktEnvironment(data.name, data.url, data.auth);
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
