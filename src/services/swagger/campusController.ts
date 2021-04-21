// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** addSingleCampus POST /api/apartment/campus */
export async function addSingleCampusUsingPOST(
  params: {
    // query
    /** campusName */
    campusName: string;
    /** description */
    description: string;
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

/** deleteSingleCampus DELETE /api/apartment/campus */
export async function deleteSingleCampusUsingDELETE(
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

/** acquireCurrentCampusNames GET /api/apartment/campus/names */
export async function acquireCurrentCampusNamesUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/campus/names', {
    method: 'GET',
    ...(options || {}),
  });
}
