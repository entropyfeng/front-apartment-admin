import request from "umi-request";

export async function queryDepartments(){


  return request('/api/university/departments').then(res=>({

    data: res.data.departments,
    total: res.data.departments.length,
    success: res.success
  }))

}
