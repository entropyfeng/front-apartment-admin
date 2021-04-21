import React, { useState } from 'react';
import type { StudentItem } from '@/pages/university/student/data';
import { Button, Descriptions, message, Modal } from 'antd';
import { convertStudentAccountStatus } from '@/utils/myUtil';
import { EditOutlined, PlusOutlined, ScissorOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import {
  createSingleStudentAccountUsingPOST,
  deleteSingleStudentAccountUsingDELETE,
  modifyStudentPasswordUsingPUT,
} from '@/services/swagger/studentController';

type StudentDetailProps = {
  visible: boolean;
  onVisibleChange: (temp: boolean) => void
  student: StudentItem;
}
const handleModifyPassword = async (studentId: string,newPassword: string) => {
  const hide = message.loading('正在修改');
  if (!newPassword) return true;
  try {
    await modifyStudentPasswordUsingPUT({studentId,newPassword})
    hide();
    message.success('修改成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};
const handleDeleteAccount = async (studentId: string) => {
  const hide = message.loading('正在删除');
  if (!studentId) return true;
  try {
    await  deleteSingleStudentAccountUsingDELETE({studentId})
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const handleCreateAccount = async (studentId: string) => {
  const hide = message.loading('正在创建');
  if (!studentId) return true;
  try {
    await  createSingleStudentAccountUsingPOST({studentId})
    hide();
    message.success('创建成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('创建失败，请重试');
    return false;
  }
};
const StudentDetail: React.FC<StudentDetailProps> = (props) => {


  const { visible, onVisibleChange,student } = props;
  const  [modifyPasswordVisible,setModifyPasswordVisible]=useState<boolean>();

 return ( <Modal
    width='1000'
    destroyOnClose
    visible={visible}
    onCancel={() => onVisibleChange(false)}
  >
     {student.studentAccountStatus==='EXIST'&&<Button onClick={()=>{

       handleDeleteAccount(student.studentId)
     }} ><ScissorOutlined /> 删除学生账号</Button>}
     {student.studentAccountStatus==='EXIST'&& <Button onClick={()=>{

       setModifyPasswordVisible(true)}
     }><EditOutlined  />修改学生密码</Button>}
     {student.studentAccountStatus==='NOT_EXIST'&&<Button onClick={()=>{

       handleCreateAccount(student.studentId)
     }} ><PlusOutlined /> 新建学生账号</Button>}
    <Descriptions title="学生信息" bordered>
      <Descriptions.Item label="ID">{student.studentId}</Descriptions.Item>
      <Descriptions.Item label="学生名称">{student.studentName}</Descriptions.Item>
      <Descriptions.Item label="学院">{student.collegeName}</Descriptions.Item>
      <Descriptions.Item label="电话">{student.phone}</Descriptions.Item>
      <Descriptions.Item label="学院">{student.email}</Descriptions.Item>
      <Descriptions.Item label="学生账号状态">{convertStudentAccountStatus(student.studentAccountStatus)}</Descriptions.Item>
      <Descriptions.Item label="入住性别">{student.gender === 'MAN' ? '男' : '女'}</Descriptions.Item>
      <Descriptions.Item label="上次修改时间">{student.updateTime}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{student.createTime}</Descriptions.Item>
    </Descriptions>

     <ModalForm
       title='修改密码'
       width="400px"
       visible={modifyPasswordVisible}
       onVisibleChange={setModifyPasswordVisible}
       onFinish={async (value) => {

          await handleModifyPassword(student.studentId,value.newPassword)

         setModifyPasswordVisible(false);


       }}
     >
       <ProFormText.Password label="新密码" name="newPassword" />

     </ModalForm>
  </Modal>
);


}
export default StudentDetail;
