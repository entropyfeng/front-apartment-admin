

import type { AuthResourceParams } from '@/pages/auth/resource/data';
import { request } from 'umi';

export async function queryAllResource(params?: AuthResourceParams) {

  return  request('/resource/all', {
    data: {
      currentPage: params?.currentPage,
      pageSize: params?.pageSize,
    },
    responseType: 'json',
    method:'GET'
  }).then(response => ({

    data: response.params.auth_resources,
    total: response.params.auth_resources.length,
    success: true,
    pageSize: params?.pageSize,
    current: params?.currentPage,
  }));

}

