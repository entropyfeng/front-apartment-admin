import request from "umi-request";
import { base64ToUint8Array } from '@/utils/myUtil';

export async function queryStudents() {

  return request('/api/university/student/all').then(res => ({

    data: res.data.students,
    total: res.data.students.length,
    success: res.success
  }))

}



export async function downloadExcel() {




  return request('/api/university/student/excel/template').then(function (res) {



   const temp=base64ToUint8Array(res.data.file)

    const  blob=new Blob([temp],{
      type:'application/octet-stream'
    })
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); // 创建a标签
    link.href = blobUrl;
    link.download = res.data.fileName;
    link.click(); // 模拟点击a标签
    window.URL.revokeObjectURL(link.href);


})}
