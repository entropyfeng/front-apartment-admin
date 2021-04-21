

import type { AuthResourceParams } from '@/pages/auth/resource/data';
import { acquireAllAuthResourceUsingGET } from '@/services/swagger/authResourceController';

export async function queryAllResource(params?: AuthResourceParams) {

  return acquireAllAuthResourceUsingGET().then(response => ({

    data: response.data?.resources,
    total: response.data?.resources.length,
    success: true,
  }));


}

