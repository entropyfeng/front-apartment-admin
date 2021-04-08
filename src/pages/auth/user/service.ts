import { request } from 'umi';
import { AuthUserParams } from '@/pages/auth/user/data';


export async function updateRolesInUser(roleIds: string[], userId: string) {
  return request('/api/auth/user/configRoles', {
    data: {
      'roleIds': roleIds,
      'userId': userId,
    },
    method: 'POST',
  });
}

export async function removeAuthUser(userIds: string[]) {

  return request('/api/auth/user', {
    method: 'DELETE',
    data: {
      'userIds': userIds,
    },
  });
}

export async function queryAllUsers(params?: AuthUserParams) {

  return request('/api/auth/user/all', {
    data: {
      currentPage: params?.currentPage,
      pageSize: params?.pageSize,
    },
    responseType: 'json',
  }).then(response => ({

    data: response.data.auth_users,
    total: response.data.auth_users.length,
    success: true,
    pageSize: params?.pageSize,
    current: params?.currentPage,
  }));

}

