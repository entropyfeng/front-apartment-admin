// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** addNewBuilding POST /api/apartment/building */
export async function addNewBuildingUsingPOST(
  body: API.BuildingVO,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/building', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteSingleBuilding DELETE /api/apartment/building */
export async function deleteSingleBuildingUsingDELETE(
  params: {
    // query
    /** buildingName */
    buildingName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/apartment/building', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAllBuilding GET /api/apartment/building/all */
export async function acquireAllBuildingUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/building/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** acquireBuildingNames GET /api/apartment/building/names */
export async function acquireBuildingNamesUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/building/names', {
    method: 'GET',
    ...(options || {}),
  });
}
