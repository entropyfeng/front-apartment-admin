export type AuthUserItem = {

  authUserId: string;
  authUsername: string;
  status: string;
  email: string;
  phone: string;
  description: string;
  createTime: Date;
  updateTime: Date;
}

export type AuthUserParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

