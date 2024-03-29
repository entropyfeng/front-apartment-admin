// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireAllAuthUser GET /api/auth/user/all */
export async function acquireAllAuthUserUsingGET(
  params: {
    // query
    /** currentPage */
    currentPage: number;
    /** pageSize */
    pageSize: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/auth/user/all', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
