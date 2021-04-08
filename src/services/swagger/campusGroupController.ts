// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireAllCampusGroup GET /api/apartment/campusGroup/all */
export async function acquireAllCampusGroupUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/campusGroup/all', {
    method: 'GET',
    ...(options || {}),
  });
}
