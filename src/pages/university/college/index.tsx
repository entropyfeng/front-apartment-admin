import React from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {queryDepartments} from "@/pages/university/college/service";
import type {DepartmentItem} from "@/pages/university/college/data";

const columns: ProColumns<DepartmentItem>[] = [
  {
    key: 'departmentId',
    title: 'Id',
    dataIndex: 'departmentId',
    hideInForm: true,
  },
  {
    key: 'departmentName',
    title: '部门(学院)名称',
    dataIndex: 'departmentName',
  },
  {
    key: 'description',
    title: '描述',
    dataIndex: 'description',
  },
  {
    key: 'updateTime',
    title: '更改时间',
    dataIndex: 'updateTime',
    hideInForm: true,
    valueType: 'dateTime',
  },

  {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'createTime',
    hideInForm: true,
    valueType: 'dateTime',
  }

];

const DepartmentAdmin: React.FC = () => {


  return (
    <PageHeaderWrapper>
      <ProTable<DepartmentItem>
        search={false}
        rowKey="departmentId"
        headerTitle="部门(学院)管理"
        columns={columns}
        request={() => queryDepartments()}
      />
    </PageHeaderWrapper>

  );

};

export default DepartmentAdmin;
