import { request } from 'umi';
import {  AuthRoleParams } from '@/pages/auth/role/data';


export async function queryAllRole(params?: AuthRoleParams) {

 return  request('/api/auth/role/all', {
    data: {
      currentPage: params?.currentPage,
      pageSize: params?.pageSize,
    },
    responseType: 'json',
  }).then(response => ({
   data: response.params.auth_roles,
   total: response.params.auth_roles.length,
   success: true,
   pageSize: params?.pageSize,
   current: params?.currentPage,
 }));

}
export async function removeAuthRole(params: { authRoleNames: string[] }) {

  return request('/api/auth/role/delete', {
    method: 'DELETE',
    data: {
      ...params
    },
  });
}

export async function addAuthRole(params: AuthRoleParams) {
  return request('/api/auth/role/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function searchResourcesByRoleName(authRoleName:string){
  return request('/api/auth/role/contains',{
    data:{
      'authRoleName':authRoleName
    }
    ,method:'GET'
    ,responseType:'json'
  })
}
export async function searchAllResourcesAndItContainsByRoleName(authRoleName:string){
  return request('/api/auth/role/allAndContains',{
    data:{
      'authRoleName':authRoleName
    }
    ,method:'GET'
    ,responseType:'json'
  })
}

