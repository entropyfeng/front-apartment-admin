// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireAvailableBuildingsName GET /api/apartment/university/available/building/names */
export async function acquireAvailableBuildingsNameUsingGET(
  params: {
    // query
    /** campusGroupName */
    campusGroupName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/university/available/building/names', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAvailableCampusName GET /api/apartment/university/available/campus/names */
export async function acquireAvailableCampusNameUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/university/available/campus/names', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireAvailableCampusGroupName GET /api/apartment/university/available/campusGroup/names */
export async function acquireAvailableCampusGroupNameUsingGET(
  params: {
    // query
    /** campusName */
    campusName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/university/available/campusGroup/names', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAvailableDormitory GET /api/apartment/university/available/dormitories */
export async function acquireAvailableDormitoryUsingGET(
  params: {
    // query
    /** buildingName */
    buildingName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/university/available/dormitories', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAvailableGlobalName GET /api/apartment/university/available/global/names */
export async function acquireAvailableGlobalNameUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/university/available/global/names', {
    method: 'GET',
    ...(options || {}),
  });
}
