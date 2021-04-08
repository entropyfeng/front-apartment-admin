import request from "umi-request";

export async function queryAllCampus(){

  return request('/api/apartment/campus/all').then(res=>({

    data: res.data.campuses,
    total: res.data.campuses.length,
    success: res.success
  }))

}
