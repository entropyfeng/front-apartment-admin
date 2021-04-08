import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { AuthResourceItem } from '@/pages/auth/resource/data';
import { queryAllResource } from '@/pages/auth/resource/service';


const AuthResourceTable: React.FC = () => {

  const columns: ProColumns<AuthResourceItem>[] = [
    {
      key: 'Id',
      title: 'Id',
      dataIndex: 'authResourceId',
      hideInForm: true,
    },
    {
      key: 'authResourceName',
      title: '用户',
      dataIndex: 'authResourceName',
    },
    {
      key: 'method',
      title: '方法',
      dataIndex: 'method',
      hideInForm: true
    },
   {

      key:'path',
      title:'路径',
      dataIndex:'path',
      hideInForm:true,
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',

    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      hideInForm: true,
      valueType: 'dateTime',

    },
    {
      key: 'updateTime',
      title: '更改时间',
      dataIndex: 'updateTime',
      hideInForm: true,
      valueType: 'dateTime',
    },

  ];


  return (
    <PageHeaderWrapper>
      <ProTable<AuthResourceItem>
        search={false}
        rowKey="authResourceId"
        headerTitle="资源控制"
        columns={columns}
        rowSelection={{}}
        request={(params, sorter, filter) => queryAllResource({ ...params, sorter, filter })}
      />
    </PageHeaderWrapper>

  );
};

export default AuthResourceTable;
