// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireDetailDormitory GET /api/apartment/detail/dormitory */
export async function acquireDetailDormitoryUsingGET(
  params: {
    // query
    /** dormitoryId */
    dormitoryId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/detail/dormitory', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireDormitory GET /api/apartment/dormitory */
export async function acquireDormitoryUsingGET(
  body: API.DormitoryVO,
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

/** acquireAllDormitory GET /api/apartment/dormitory/all */
export async function acquireAllDormitoryUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/dormitory/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireMyDormitory GET /api/apartment/dormitory/my */
export async function acquireMyDormitoryUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/dormitory/my', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireResidentStudent GET /api/apartment/resident */
export async function acquireResidentStudentUsingGET(
  params: {
    // query
    /** dormitoryId */
    dormitoryId: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/resident', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
