import request from "umi-request";

export async function queryAllCampusGroup(){

  return request('/api/apartment/campusGroup/all').then(res=>({

    data: res.data.campusGroups,
    total: res.data.campusGroups.length,
    success:true
  }))

}
