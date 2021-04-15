import React from 'react';
import {
  acquireMyDormitoryStatusUsingGET,
} from '@/services/swagger/orderDormitoryController';
import { useRequest } from '@@/plugin-request/request';
import OrderDormitory from '@/pages/apartment/order/components/OrderDormitory';


const ApartmentAdmin: React.FC = () => {

  const {data,error,loading}=useRequest(acquireMyDormitoryStatusUsingGET);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const status=data?.myStatus;
  return (<div>
    {!status&&<OrderDormitory/>}{
      status&&'已入住'
  }
  </div>);

};

export default ApartmentAdmin;
