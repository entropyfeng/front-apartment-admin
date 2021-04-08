import React from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {CampusItem} from "@/pages/apartment/admin/campus/data";
import {queryAllCampus} from "@/pages/apartment/admin/campus/service";

const columns: ProColumns<CampusItem>[] = [
  {
    key: 'campusName',
    title: '名称',
    dataIndex: 'campusName',
    hideInForm: true,
  },

  {
    key: 'updateTime',
    title: '更改时间',
    dataIndex: 'updateTime',
    hideInForm: true,
    valueType: 'dateTime',
  },
  {
    key: 'description',
    title: '描述',
    dataIndex: 'description',
  },
  {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'createTime',
    hideInForm: true,
    valueType: 'dateTime',
  }

];

const CampusAdmin: React.FC = () => {


  return (
    <PageHeaderWrapper>
      <ProTable<CampusItem>
        search={false}
        rowKey="campusName"
        headerTitle="校区管理"
        columns={columns}
        request={() => queryAllCampus()}
      />
    </PageHeaderWrapper>

  );

};

export default CampusAdmin;
