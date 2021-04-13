import React, { useState } from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import ProTable from '@ant-design/pro-table';
import { AuthResourceItem } from '@/pages/auth/resource/data';
import { queryAllResource } from '@/pages/auth/resource/service';
import { useRequest } from '@@/plugin-request/request';
import {
  acquireAvailableCampusGroupNamesUsingGET,
  acquireAvailableCampusNamesUsingGET,
} from '@/services/swagger/orderDormitoryController';
import { Cascader } from 'antd';
import MyCascade from '@/pages/apartment/order/components/DetailCascade';



const ApartmentAdmin: React.FC = () => {


  const {data,error,loading}=useRequest(acquireAvailableCampusNamesUsingGET)


  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

return (<MyCascade names={data.names}/>);

};

export default ApartmentAdmin;
