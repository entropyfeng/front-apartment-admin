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

/** acquireAllBuilding GET /api/apartment/building/all */
export async function acquireAllBuildingUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/apartment/building/all', {
    method: 'GET',
    ...(options || {}),
  });
}
