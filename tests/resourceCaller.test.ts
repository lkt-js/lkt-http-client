import {createHTTPEnvironment, createHTTPPostResource, ResourceCaller, ResourceCallerConfig} from "../src";
import {EnvironmentData} from "../src/types/EnvironmentData";
import {ResourceData} from "../src/types/ResourceData";

const envData: EnvironmentData = {
  url: 'http://localhost',
  name: 'default'
};

createHTTPEnvironment(envData);

test('resource caller - non existing resource', () => {

  const config: ResourceCallerConfig = {
    resource: 'something',
  }

  const caller = new ResourceCaller(config);
  expect(caller.isCallable()).toEqual(false);
});

test('resource caller - existing resource', () => {

  const resourceData: ResourceData = {
    url: '/api/test/create/{name}',
    name: 'create-test-item',
    method: 'put',
    params: {
      id: { default: undefined },
      name: { default: undefined },
      type: { default: undefined },
      isSomething: { default: undefined },
    },
    isFileUpload: true
  };

  createHTTPPostResource(resourceData);

  const config: ResourceCallerConfig = {
    resource: 'create-test-item',
  }

  const caller = new ResourceCaller(config);
  expect(caller.isCallable()).toEqual(true);

  expect(caller.call()).toBeInstanceOf(Promise);
});