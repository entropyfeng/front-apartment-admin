export type StudentItem = {

  studentId: string;
  studentName: string;
  idCardNumber: string;
  collegeId: string;
  collegeName: string;
  studentStatus: "UNKNOWN"| "DEATH"|"SUSPENSION"| "REGISTERED"|"NOT_REGISTERED"| "ADMITTED_NOT_REGISTERED"|"GRADUATION"|"COMPLETION"|"IN_COMPLETION";

  email: string;
  phone: string;
  gender: "UNKNOWN"|"WOMAN"|"MAN";
  apartmentId: string;
  // 住宿状态
  accStatus: "UNKNOWN"|"AT_SCHOOL"|"NOT_AT_SCHOOL";
  // 学生账号状态
  studentAccountStatus: "UNKNOWN"|"EXIST"|"NOT_EXIST";

  description: string;
  createTime: Date;
  updateTime: Date;
}
