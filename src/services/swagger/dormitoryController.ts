// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireDormitoryByBuildingId GET /api/apartment/dormitory */
export async function acquireDormitoryByBuildingIdUsingGET(
  body: number,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/dormitory', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** acquireMyDormitory GET /api/apartment/dormitory/my */
export async function acquireMyDormitoryUsingGET(
  params: {
    // query
    roles?: string[];
    userId?: number;
    userName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/dormitory/my', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
