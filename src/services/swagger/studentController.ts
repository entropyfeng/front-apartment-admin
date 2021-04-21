// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** modifySingleStudent PUT /api/university/student */
export async function modifySingleStudentUsingPUT(
  body: API.StudentTo,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/student', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addSingleStudent POST /api/university/student */
export async function addSingleStudentUsingPOST(
  body: API.StudentTo,
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteSingleStudent DELETE /api/university/student */
export async function deleteSingleStudentUsingDELETE(
  params: {
    // query
    /** studentId */
    studentId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/student', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createSingleStudentAccount POST /api/university/student/account */
export async function createSingleStudentAccountUsingPOST(
  params: {
    // query
    /** studentId */
    studentId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/student/account', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteSingleStudentAccount DELETE /api/university/student/account */
export async function deleteSingleStudentAccountUsingDELETE(
  params: {
    // query
    /** studentId */
    studentId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/student/account', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** acquireAllStudent GET /api/university/student/all */
export async function acquireAllStudentUsingGET(options?: { [key: string]: any }) {
  return request<API.Message>('/api/university/student/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** insertStudentsFromExcel POST /api/university/student/excel */
export async function insertStudentsFromExcelUsingPOST(
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

/** modifyStudentPassword PUT /api/university/student/password */
export async function modifyStudentPasswordUsingPUT(
  params: {
    // query
    /** newPassword */
    newPassword: string;
    /** studentId */
    studentId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Message>('/api/university/student/password', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
