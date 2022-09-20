import {
  createHTTPEnvironment,
  createHTTPGetResource, createHTTPPostResource,
  createHTTPPutResource,
} from '../src';
import { LktResource } from '../src/classes/LktResource';
import { ResourceBuild } from '../src/classes/ResourceBuild';
import { EnvironmentData } from '../src/types/EnvironmentData';
import { ResourceData } from '../src/types/ResourceData';

test('create a resource', () => {
  const resourceData: ResourceData = {
    url: '/api/test/create/{name}',
    name: 'create-test-item',
    params: {
      id: { default: undefined },
      name: { default: undefined },
      type: { default: undefined },
      isSomething: { default: undefined },
    },
  };

  const resource = createHTTPPutResource(resourceData);

  expect(resource).toBeInstanceOf(LktResource);

  const build = resource.build({ name: 'lorem', type: 'ipsum' });

  expect(build).toBeInstanceOf(ResourceBuild);
  expect(build.url).toEqual('/api/test/create/lorem');
  expect(build.data).toEqual({ type: 'ipsum' });
  expect(build.statusValidator(200)).toEqual(true);
});

test('create a resource get', () => {
  const resourceData: ResourceData = {
    url: '/api/test/create/{name}',
    name: 'create-test-item',
    params: {
      id: { default: undefined },
      name: { default: undefined },
      type: { default: undefined },
      isSomething: { default: undefined },
    },
  };

  const resource = createHTTPGetResource(resourceData);

  expect(resource).toBeInstanceOf(LktResource);

  const build = resource.build({ name: 'lorem', type: 'ipsum' });

  expect(build).toBeInstanceOf(ResourceBuild);
  expect(build.url).toEqual('/api/test/create/lorem?type=ipsum');
  expect(build.data).toEqual({});
  expect(build.statusValidator(200)).toEqual(true);
});

test('call a resource get with custom environment', () => {

  const envData: EnvironmentData = {
    url: 'http://localhost',
    name: 'default'
  };

  createHTTPEnvironment(envData);

  const resourceData: ResourceData = {
    url: '/api/test/create/{name}',
    name: 'create-test-item',
    params: {
      id: { default: undefined },
      name: { default: undefined },
      type: { default: undefined },
      isSomething: { default: undefined },
    },
    environment: 'default'
  };

  const resource = createHTTPGetResource(resourceData);

  expect(resource).toBeInstanceOf(LktResource);

  const build = resource.build({ name: 'lorem', type: 'ipsum' });

  expect(build).toBeInstanceOf(ResourceBuild);
  expect(build.url).toEqual('http://localhost/api/test/create/lorem?type=ipsum');
  expect(build.data).toEqual({});
  expect(build.statusValidator(200)).toEqual(true);
});

test('renaming params', () => {

  const envData: EnvironmentData = {
    url: 'http://localhost',
    name: 'default'
  };

  createHTTPEnvironment(envData);

  const resourceData: ResourceData = {
    url: '/api/test/create/{name}',
    name: 'create-test-item',
    params: {
      id: { default: undefined, renameTo: 'code' },
      name: { default: undefined },
      type: { default: undefined },
      isSomething: { default: undefined },
    },
    environment: 'default'
  };

  const resource = createHTTPPostResource(resourceData);

  expect(resource).toBeInstanceOf(LktResource);

  const build = resource.build({ id: 1, name: 'lorem', type: 'ipsum' });

  expect(build).toBeInstanceOf(ResourceBuild);
  expect(build.url).toEqual('http://localhost/api/test/create/lorem');
  expect(build.data).toEqual({code: 1, type: 'ipsum'});
  expect(build.statusValidator(200)).toEqual(true);
});

test('validate params', () => {

  const envData: EnvironmentData = {
    url: 'http://localhost',
    name: 'default'
  };

  createHTTPEnvironment(envData);

  const resourceData: ResourceData = {
    url: '/api/test/create/{name}',
    name: 'create-test-item',
    params: {
      id: { default: undefined, renameTo: 'code', type: "number" },
      name: { default: undefined, type: "string" },
      type: { default: 'defaultValue', type: "string" },
      isSomething: { default: undefined, type: "boolean" },
      someArray: { default: undefined, type: "array" },
      someObject: { default: undefined, type: "object" },
    },
    environment: 'default'
  };

  const resource = createHTTPPostResource(resourceData);

  expect(resource).toBeInstanceOf(LktResource);

  const build = resource.build({ id: 1, name: 'lorem', isSomething: false, someArray: [], someObject: {} });

  expect(build).toBeInstanceOf(ResourceBuild);
  expect(build.url).toEqual('http://localhost/api/test/create/lorem');
  expect(build.data).toEqual({code: 1, type: 'defaultValue', someArray: [], someObject: {}});
  expect(build.statusValidator(200)).toEqual(true);
});

// test('create a resource (fileupload)', () => {
//   const resourceData: ResourceData = {
//     url: '/api/test/create/{name}',
//     name: 'create-test-item',
//     method: 'put',
//     params: {
//       id: { default: undefined },
//       name: { default: undefined },
//       type: { default: undefined },
//       isSomething: { default: undefined },
//     },
//     // isFileUpload: true
//   };
//
//   const resource = createHTTPResource(resourceData);
//
//   expect(resource).toBeInstanceOf(LktResource);
//
//   const build = resource.build({ name: 'lorem', type: 'ipsum' });
//
//   expect(build).toBeInstanceOf(ResourceBuild);
//   expect(build.url).toEqual('/api/test/create/lorem');
//   expect(build.data).toEqual({ type: 'ipsum' });
//   expect(build.statusValidator(200)).toEqual(true);
// });