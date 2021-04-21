// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** addSingleCampusGroup POST /api/apartment/campusGroup */
export async function addSingleCampusGroupUsingPOST(
  params: {
    // query
    /** campusGroupName */
    campusGroupName: string;
    /** campusName */
    campusName: string;
    /** description */
    description: string;
    /** inGender */
    inGender: 'UNKNOWN' | 'MAN' | 'WOMAN' | 'MIX';
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/campusGroup', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteSingleCampusGroup DELETE /api/apartment/campusGroup */
export async function deleteSingleCampusGroupUsingDELETE(
  params: {
    // query
    /** campusGroupName */
    campusGroupName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/campusGroup', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAllCampusGroup GET /api/apartment/campusGroup/all */
export async function acquireAllCampusGroupUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/campusGroup/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireCurrentCampusGroupNames GET /api/apartment/campusGroup/names */
export async function acquireCurrentCampusGroupNamesUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/campusGroup/names', {
    method: 'GET',
    ...(options || {}),
  });
}
