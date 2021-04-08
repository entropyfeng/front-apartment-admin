// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** test GET /api/ */
export async function testUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** addCampus POST /api/apartment/campus */
export async function addCampusUsingPOST(
  params: {
    // query
    /** campusName */
    campusName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/campus', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteCampus DELETE /api/apartment/campus */
export async function deleteCampusUsingDELETE(
  params: {
    // query
    /** campusName */
    campusName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/campus', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAllCampus GET /api/apartment/campus/all */
export async function acquireAllCampusUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/campus/all', {
    method: 'GET',
    ...(options || {}),
  });
}
