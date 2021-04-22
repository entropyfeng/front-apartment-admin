// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireApartmentBaseInfo GET /api/apartment/base/info */
export async function acquireApartmentBaseInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/base/info', {
    method: 'GET',
    ...(options || {}),
  });
}
