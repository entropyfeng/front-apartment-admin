import request from "umi-request";

export async function queryStudents() {

  return request('/api/university/student/all').then(res => ({

    data: res.data.students,
    total: res.data.students.length,
    success: res.success
  }))

}

export async function downloadExcel() {

  return request('/api/university/student/excel/template').then(function (res) {
    const fileString = res.data.file;
    const {fileName} = res.data;

    const blobUrl = window.URL.createObjectURL(fileString);


    const aElement = document.createElement('a');

    document.body.appendChild(aElement);

    aElement.style.display = 'none';

    aElement.href = blobUrl;

    aElement.download = fileName;

    aElement.click();

    document.body.removeChild(aElement);

    console.log(res)
  })
}
