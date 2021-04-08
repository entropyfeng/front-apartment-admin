import React from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {CampusGroupItem} from "@/pages/apartment/admin/campusGroup/data";
import {queryAllCampusGroup} from "@/pages/apartment/admin/campusGroup/service";

const columns: ProColumns<CampusGroupItem>[] = [
  {
    key: 'campusGroupId',
    title: 'Id',
    dataIndex: 'campusGroupId',
    hideInForm: true,
  },
  {
    title: '校区名称',
    dataIndex: 'campusName',
    hideInForm: true,
  },
  {
    title: '校区组名称',
    dataIndex: 'campusGroupName',
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
      <ProTable<CampusGroupItem>
        search={false}
        rowKey="campusGroupId"
        headerTitle="校区组管理"
        columns={columns}
        request={() => queryAllCampusGroup()}
      />
    </PageHeaderWrapper>

  );

};

export default CampusAdmin;
