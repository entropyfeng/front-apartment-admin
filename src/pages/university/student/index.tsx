import React, { useRef, useState } from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

import type {ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import defaultSettings from '../../../../config/defaultSettings'
import type {StudentItem} from "@/pages/university/student/data";
import {downloadExcel, queryStudents} from "@/pages/university/student/service";
import {Button, message, Upload} from "antd";
import {DownloadOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';

import { addSingleStudentUsingPOST, deleteSingleStudentUsingDELETE } from '@/services/swagger/studentController';
import { acquireCurrentCollegeNamesUsingGET } from '@/services/swagger/collegeController';

import StudentDetail from '@/pages/university/student/components/StudentDetail';




const handleAdd = async (fields: StudentItem) => {
  const hide = message.loading('正在添加');
  try {
   await addSingleStudentUsingPOST({
      studentId:fields.studentId,
      studentName:fields.studentName,
      gender:fields.gender,
     phone:fields.phone,
     email:fields.email,
      collegeName:fields.collegeName,
      idCardNumber:fields.idCardNumber,
    })
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const insertUploadProps = {
  name: 'file',
  action: `/api/university/student/excel`,
  headers: {
    auth_token:localStorage.getItem(defaultSettings.authTokenName) ,
  },
  accept:'.xlsx'
  ,
  onChange(info: { file: { status: string; name: any; }; fileList: any; }) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const handleSingleRemove = async (studentId: string) => {
  const hide = message.loading('正在删除');
  if (!studentId) return true;
  try {
    await deleteSingleStudentUsingDELETE({studentId});
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const StudentAdmin: React.FC = () => {

  const actionRef = useRef<ActionType>();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<StudentItem>();
  const [detailVisible,handleDetailVisible]=useState<boolean>(false);
  const columns: ProColumns<StudentItem>[] = [
    {
      key: 'studentId',
      title: '学号',
      dataIndex: 'studentId',
      hideInForm: true,
    },
    {
      key: 'studentName',
      title: '姓名',
      dataIndex: 'studentName',
    },
    {
      key: 'gender',
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        'MAN': {
          text: '男',
          status: 'MAN',
        },
        'WOMAN': {
          text: '女',
          status: 'WOMAN',
        },
        'UNKNOWN': {
          text: '未知',
          status: 'UNKNOWN',
        },
      },
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      key: 'phone',
      title: '电话',
      dataIndex: 'phone',
    },
    {
      key: 'accStatus',
      title: '住宿状态',
      dataIndex: 'accStatus',
      valueEnum: {
        'AT_SCHOOL': {
          text: '在校',
          status: 'AT_SCHOOL',
        },
        'NOT_AT_SCHOOL': {
          text: '不在校',
          status: 'NOT_AT_SCHOOL',
        },
        'UNKNOWN': {
          text: '未知',
          status: 'UNKNOWN',
        },
      },

    },
    {
      key: 'studentAccountStatus',
      title: '学生账号状态',
      dataIndex: 'studentAccountStatus',
      valueEnum: {
        'EXIST': {
          text: '存在',
          status: 'EXIST',
        },
        'NOT_EXIST': {
          text: '不存在',
          status: 'NOT_EXIST',
        },
        'UNKNOWN': {
          text: '未知',
          status: 'UNKNOWN',
        },
      },

    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
    },
    {
      key: 'collegeName',
      title: '学院名称',
      dataIndex: 'collegeName',
    },
    {
      key: 'updateTime',
      title: '更改时间',
      dataIndex: 'updateTime',
      hideInForm: true,
      valueType: 'dateTime',
    },

    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      hideInForm: true,
      valueType: 'dateTime',
    },{
      key:'option',
      title:'操作',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleSingleRemove(record.studentId)
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
        <a
        key="delete"
          onClick={()=>{
          handleDetailVisible(true);
          setCurrentRow(record);
        }}>详情</a>,
      ],
    }

  ];
  return (
    <PageHeaderWrapper >

      <ProTable<StudentItem>
        actionRef={actionRef}
        search={false}
        rowKey="studentId"
        headerTitle={null}
        columns={columns}
        request={() => queryStudents()}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>{
            handleModalVisible(true)

          }

          }>
            新建
          </Button>,
          // @ts-ignore
          <Upload {...insertUploadProps}>
            <Button icon={<UploadOutlined />}>批量添加学生</Button>
          </Upload>,
          <Button
            icon={<DownloadOutlined />}
            onClick={downloadExcel}
          >下载模板</Button>,
        ]}
      />

      <ModalForm

        title='新建学生'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {

          const success = await handleAdd(value as StudentItem);

          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >

        <ProFormText
          rules={[
            {
              required: true,
              message: '学号',
            },
          ]}
          tooltip="学号不能为空"
          label="学号"
          width="md"
          name="studentId"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '姓名',
            },
          ]}
          tooltip="姓名不能为空"
          label="姓名"
          width="md"
          name="studentName"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '邮箱',
            },
          ]}
          tooltip="邮箱不能为空"
          label="邮箱"
          width="md"
          name="email"
        />
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'MAN',
                label: '男',
              },{
                value:'WOMAN',
                label:'女'
              }
            ]}
            width="xs"
            name="gender"
            label="性别"
          />
          <ProFormSelect
            request={
              ()=> acquireCurrentCollegeNamesUsingGET().then(nameRes=>{
                const res: any[] | PromiseLike<any[]>=[];
                nameRes?.data?.names.forEach((name: string)=>{
                  res.push({
                    value:name,label:name
                  })
                })
                return res;
              })

            }
            width="xs"
            name="collegeName"
            label="学院名"
          />
        </ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '电话',
            },
          ]}
          tooltip="电话不能为空"
          label="电话"
          width="md"
          name="phone"
        />

      </ModalForm>
      {currentRow!=null&&<StudentDetail visible={detailVisible} onVisibleChange={handleDetailVisible} student={currentRow as StudentItem}/>}
    </PageHeaderWrapper>

  );

};

export default StudentAdmin;
