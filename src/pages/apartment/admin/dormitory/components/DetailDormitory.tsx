import React from 'react';
import type { DormitoryItem } from '@/pages/apartment/admin/dormitory/data';
import { Card, Modal } from 'antd';
import { useRequest } from '@@/plugin-request/request';
import { acquireDetailDormitoryUsingGET } from '@/services/swagger/dormitoryController';

interface DetailDormitoryProps {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<DormitoryItem>;
}
const DetailDormitory: React.FC<DetailDormitoryProps> = (props) => {
  const { modalVisible, onCancel,values  } = props;

  const {data,error,loading}=useRequest(()=>{
    // @ts-ignore
    return   acquireDetailDormitoryUsingGET({dormitoryId:values.dormitoryId});
  })
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  return (  <Modal
    destroyOnClose
    title="详情"
    visible={modalVisible}
    onCancel={() => onCancel()}
  >
    <Card bordered={false}/>

  </Modal>);
}
export default DetailDormitory;
