import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {CollegeItem} from "@/pages/university/college/data";
import {
  acquireAllCollegeUsingGET,
  addSingleCollegeUsingPOST,
  deleteSingleCollegeUsingDELETE,
} from '@/services/swagger/collegeController';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  { ModalForm, ProFormText } from '@ant-design/pro-form';

const handleSingleRemove = async (collegeName: string) => {
  const hide = message.loading('正在删除');
  if (!collegeName) return true;
  try {
    await deleteSingleCollegeUsingDELETE({collegeName});
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleAdd = async (fields: CollegeItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSingleCollegeUsingPOST({collegeName:fields.collegeName,description:fields.description})
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const CollegeAdmin: React.FC = () => {

  const actionRef = useRef<ActionType>();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const columns: ProColumns<CollegeItem>[] = [
    {
      key: 'collegeId',
      title: 'Id',
      dataIndex: 'collegeId',
      hideInForm: true,
    },
    {
      key: 'collegeName',
      title: '学院名称',
      dataIndex: 'collegeName',
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
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

            handleSingleRemove(record.collegeName)
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
      ],
    }

  ];

  // @ts-ignore
  return (
    <PageHeaderWrapper>
      <ProTable<CollegeItem>
        search={false}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {

              handleModalVisible(true)
            }}
          >
            <PlusOutlined /> 新建学院
          </Button>,
        ]}
        rowKey="collegeId"
        headerTitle="学院管理"
        columns={columns}
        request={() => acquireAllCollegeUsingGET().then(res=>({
          // @ts-ignore
          data: res.data.colleges,
          // @ts-ignore
          total: res.data.colleges.length,
          success: res.success
          })
        )}
      />


      <ModalForm
        title='新建学院'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {

          const success = await handleAdd(value as CollegeItem);

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
              message: '学院名称',
            },
          ]}
          tooltip="学院名称不能为空"
          label="学院名称"
          width="md"
          name="collegeName"
        />

      </ModalForm>
    </PageHeaderWrapper>

  );

};

export default CollegeAdmin;
