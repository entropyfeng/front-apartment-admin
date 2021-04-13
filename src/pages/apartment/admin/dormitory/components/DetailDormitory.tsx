import React from 'react';
import type { DormitoryItem } from '@/pages/apartment/admin/dormitory/data';
import { Descriptions, Modal } from 'antd';
import { useRequest } from '@@/plugin-request/request';
import { acquireDetailDormitoryUsingGET } from '@/services/swagger/dormitoryController';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

interface DetailDormitoryProps {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<DormitoryItem>;
}

export type StudentResidentItem = {

  bedId: number;
  collegeName: number;
  email: string;
  gender: 'MAN' | 'WOMAN'|'UNKNOWN';
  idCardNumber: string;
  phone: string;
  registerYear: string;
  studentId: string;
  studentName: string;

}
const columns: ProColumns<StudentResidentItem>[] = [
  {
    title: '床位号',
    dataIndex: 'bedId',
    key:'bedId'
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    key: 'studentId',
  }, {
    title: '学院',
    dataIndex: 'collegeName',
    key: 'collegeName',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },{
    title:'性别',
    dataIndex: 'gender',
    key:'gender',
    valueEnum: {
      MAN: {
        text: '男',
        status: 'MAN',
      },
      WOMAN: {
        text: '女',
        status: 'WOMAN',
      },
      MIX: {
        text: '混合',
        status: 'MIX',
      },
      UNKNOWN: {
        text: '未知',
        status: 'UNKNOWN',
      },
    },
  },
  {
    title: '身份证号',
    dataIndex: 'idCardNumber',
    key: 'idCardNumber',
  },
  {
    title: '入学时间',
    dataIndex: 'registerYear',
    key: 'registerYear',
  },
];
const DetailDormitory: React.FC<DetailDormitoryProps> = (props) => {
  const { modalVisible, onCancel, values } = props;

  const { data, error, loading } = useRequest(() => {
    // @ts-ignore
    return acquireDetailDormitoryUsingGET({ dormitoryId: values.dormitoryId });
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  // @ts-ignore
  const dor = data.dormitory;
  const studentList=data?.dormitory.studentList;
  return (
    <Modal
      width='1000'
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
        <Descriptions.Item label="入住性别">{dor.inGender === 'MAN' ? '男' : '女'}</Descriptions.Item>
        <Descriptions.Item label="电梯">{dor.hasElevator ? '有电梯' : '无电梯'}</Descriptions.Item>
        <Descriptions.Item label="朝向">{dor.dormitoryDirection}</Descriptions.Item>
        <Descriptions.Item label="上次修改时间">{dor.updateTime}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{dor.createTime}</Descriptions.Item>
      </Descriptions>
      {studentList!=null&&<ProTable search={false} toolBarRender={false} pagination={false} dataSource={studentList} key="bedId" rowKey="bedId" columns={columns}/>}
    </Modal>);
};
export default DetailDormitory;
