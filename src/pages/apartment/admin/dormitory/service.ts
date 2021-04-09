import request from 'umi-request';

export async function queryAllDormitories() {
  return request('/api/apartment/dormitory/all').then((res) => ({
    data: res.data.dormitories,
    total: res.data.dormitories.length,
    success: res.success,
  }));
}
