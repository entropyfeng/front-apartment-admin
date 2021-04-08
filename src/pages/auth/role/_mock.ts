import data from './response.json';

import roleContain from './roleContainResource.json'

export default {
  'GET /auth/role/all': data,
  'GET /auth/role/contains': roleContain,
  'GET /auth/role/allAndContains':roleContain
};
