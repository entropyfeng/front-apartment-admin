// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireAllAuthResource GET /api/auth/resource/all */
export async function acquireAllAuthResourceUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/auth/resource/all', {
    method: 'GET',
    ...(options || {}),
  });
}
