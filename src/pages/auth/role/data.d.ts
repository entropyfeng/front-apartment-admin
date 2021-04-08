
export interface AuthRoleItem{
  key: number;
  authRoleId:string;
  authRoleName:string;
  status:string;
  description:string;
  createTime:Date;
  updateTime:Date;
}
export interface AuthRoleParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

