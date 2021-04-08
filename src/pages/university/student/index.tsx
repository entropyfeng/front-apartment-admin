import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import defaultSettings from '../../../../config/defaultSettings'
import type {StudentItem} from "@/pages/university/student/data";
import {downloadExcel, queryStudents} from "@/pages/university/student/service";
import {Button, Dropdown, Menu, message, Upload} from "antd";
import {DownloadOutlined, EllipsisOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";


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
  }

];


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
const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const CampusAdmin: React.FC = () => {


  return (
    <PageHeaderWrapper>

      <ProTable<StudentItem>
        search={false}
        rowKey="studentId"
        headerTitle="学生管理"
        columns={columns}
        request={() => queryStudents()}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Upload {...insertUploadProps}>
            <Button icon={<UploadOutlined />}>批量添加学生</Button>
          </Upload>,
          <Button
            icon={<DownloadOutlined />}
            onClick={downloadExcel}
          >下载</Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageHeaderWrapper>

  );

};

export default CampusAdmin;
