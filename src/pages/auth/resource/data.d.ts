export interface AuthResourceItem{
  key: number;
  authResourceId:string;
  authResourceName:string;
  status:string;
  description:string;
  path:string;
  method:string;
  createTime:Date;
  updateTime:Date;
}
export interface AuthResourceParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
