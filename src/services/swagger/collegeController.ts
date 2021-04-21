// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** addSingleCollege POST /api/university/college */
export async function addSingleCollegeUsingPOST(
  body: API.CollegeTo,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/college', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteSingleCollege DELETE /api/university/college */
export async function deleteSingleCollegeUsingDELETE(
  params: {
    // query
    /** collegeName */
    collegeName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/college', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAllCollege GET /api/university/college/all */
export async function acquireAllCollegeUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/university/college/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireCurrentCollegeNames GET /api/university/college/names */
export async function acquireCurrentCollegeNamesUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/university/college/names', {
    method: 'GET',
    ...(options || {}),
  });
}
