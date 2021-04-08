import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/account/currentUser');
}

export async function queryProvince() {
  return request('/api/auth/directory/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/auth/directory/geographic/city?province=${province}`);
}

export async function query() {
  return request('/api/users');
}
