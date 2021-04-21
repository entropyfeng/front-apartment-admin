import React from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRequest } from '@@/plugin-request/request';
import { acquireMyDormitoryUsingGET } from '@/services/swagger/dormitoryController';
import { Descriptions } from 'antd';
import { convertDirection } from '@/utils/myUtil';
import { checkOutMyDormitoryUsingPOST } from '@/services/swagger/orderDormitoryController';


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

const ApartmentAdmin: React.FC = () => {


 const{data,loading,error} = useRequest(acquireMyDormitoryUsingGET);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // @ts-ignore
  const  {exist,username} = data;
  if (!exist){
    return <div>未有{username}住宿信息</div>;
  }
  // @ts-ignore
  const dor = data.dormitory;
  const studentList=data?.dormitory.studentList;

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
    {
      title:'操作',
      dataIndex:'option',
      render: (_, record) => [

        <a key="checkOut" onClick={()=>{
          checkOutMyDormitoryUsingPOST()
        }
        }>{username===record.studentId&&'退宿'}</a>
      ],
    }
  ];
  return (
    <PageHeaderWrapper title={false}>
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
        <Descriptions.Item label="朝向">{convertDirection(dor.dormitoryDirection)}</Descriptions.Item>
      </Descriptions>
      {studentList!=null&&<ProTable search={false} toolBarRender={false} pagination={false} dataSource={studentList} key="bedId" rowKey="bedId" columns={columns}/>}
    </PageHeaderWrapper>);

};

export default ApartmentAdmin;
