import request from "umi-request";

export async function queryAllBuilding(){

  return request('/api/apartment/building/all').then(res=>({

    data: res.data.buildings,
    total: res.data.buildings.length,
    success: res.success
  }))

}
