import React from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import ProTable from '@ant-design/pro-table';
import { AuthResourceItem } from '@/pages/auth/resource/data';
import { queryAllResource } from '@/pages/auth/resource/service';

const ApartmentAdmin: React.FC = () => {




  return (
    <PageHeaderWrapper>
      <ProTable<AuthResourceItem>
        search={false}
        rowKey="authResourceId"
        headerTitle="资源控制"
        rowSelection={{}}
        request={(params, sorter, filter) => queryAllResource({ ...params, sorter, filter })}
      />
    </PageHeaderWrapper>

  );

};

export default ApartmentAdmin;
