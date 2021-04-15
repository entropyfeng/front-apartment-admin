// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** checkInMyDormitory POST /api/apartment/my/checkIn */
export async function checkInMyDormitoryUsingPOST(
  params: {
    // query
    /** bedId */
    bedId: number;
    /** dormitoryId */
    dormitoryId: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/my/checkIn', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** checkOutMyDormitory POST /api/apartment/my/checkOut */
export async function checkOutMyDormitoryUsingPOST(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/my/checkOut', {
    method: 'POST',
    ...(options || {}),
  });
}

/** acquireAvailableBuildingNames GET /api/apartment/university/available/building/names */
export async function acquireAvailableBuildingNamesUsingGET(
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

/** acquireAvailableCampusNames GET /api/apartment/university/available/campus/names */
export async function acquireAvailableCampusNamesUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/university/available/campus/names', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireAvailableCampusGroupNames GET /api/apartment/university/available/campusGroup/names */
export async function acquireAvailableCampusGroupNamesUsingGET(
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
