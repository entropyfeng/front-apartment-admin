// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireAllAuthRole GET /api/auth/role/all */
export async function acquireAllAuthRoleUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/auth/role/all', {
    method: 'GET',
    ...(options || {}),
  });
}
