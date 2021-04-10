import React from 'react';
import type { DormitoryItem } from '@/pages/apartment/admin/dormitory/data';
import { Descriptions, Modal } from 'antd';
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
   // @ts-ignore
  const dor= data.dormitory;
  return (  <Modal
    destroyOnClose
    visible={modalVisible}
    onCancel={() => onCancel()}
  >

    <Descriptions title="公寓信息" bordered>
      <Descriptions.Item label="ID">{dor.dormitoryId}</Descriptions.Item>
      <Descriptions.Item label="公寓名称">{dor.dormitoryName}</Descriptions.Item>
      <Descriptions.Item label="楼栋名称">{dor.buildingName}</Descriptions.Item>
      <Descriptions.Item label="校区名">{dor.campusName}</Descriptions.Item>
      <Descriptions.Item label="校区组名">{dor.campusGroupName}</Descriptions.Item>
      <Descriptions.Item label="当前容量">{dor.currentCapacity}</Descriptions.Item>
      <Descriptions.Item label="总容量">{dor.totalCapacity}</Descriptions.Item>
      <Descriptions.Item label="楼层">{dor.floor}</Descriptions.Item>
      <Descriptions.Item label="性别">{dor.inGender==="MAN"?"男":"女"}</Descriptions.Item>
      <Descriptions.Item label="电梯">{dor.hasElevator?"有电梯":"无电梯"}</Descriptions.Item>
      <Descriptions.Item label="朝向">{dor.dormitoryDirection}</Descriptions.Item>
      <Descriptions.Item label="上次修改时间">{dor.updateTime}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{dor.createTime}</Descriptions.Item>
    </Descriptions>
  </Modal>);
}
export default DetailDormitory;
