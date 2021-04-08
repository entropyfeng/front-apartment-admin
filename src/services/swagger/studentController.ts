// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** acquireAllStudent GET /api/university/student/all */
export async function acquireAllStudentUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/university/student/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** insertStudentsFromExcel POST /api/university/student/excel */
export async function insertStudentsFromExcelUsingPOST(
  params: {
    // query
    roles?: string[];
    userId?: number;
    userName?: string;
  },
  body: {
    /** file */
    file?: string;
  },
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(ele, typeof item === 'object' ? JSON.stringify(item) : item);
    }
  });

  return request<API.Message>('/api/university/student/excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    data: formData,
    ...(options || {}),
  });
}

/** downloadInsertStudentTemplate GET /api/university/student/excel/template */
export async function downloadInsertStudentTemplateUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/university/student/excel/template', {
    method: 'GET',
    ...(options || {}),
  });
}
