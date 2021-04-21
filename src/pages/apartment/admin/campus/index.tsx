import React, { useRef, useState } from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import type {CampusItem} from "@/pages/apartment/admin/campus/data";
import {queryAllCampus} from "@/pages/apartment/admin/campus/service";
import { Button, message } from 'antd';
import { addSingleCampusUsingPOST, deleteSingleCampusUsingDELETE } from '@/services/swagger/campusController';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

const handleSingleRemove = async (campusName: string) => {
  const hide = message.loading('正在删除');
  if (!campusName) return true;
  try {
    await deleteSingleCampusUsingDELETE({campusName})
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleAdd = async (fields: CampusItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSingleCampusUsingPOST({campusName:fields.campusName, description:fields.description})
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const CampusAdmin: React.FC = () => {

  const actionRef = useRef<ActionType>();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const columns: ProColumns<CampusItem>[] = [
    {
      key: 'campusName',
      title: '名称',
      dataIndex: 'campusName',
      hideInForm: true,
    },

    {
      key: 'updateTime',
      title: '更改时间',
      dataIndex: 'updateTime',
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
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
            handleSingleRemove(record.campusName)
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
  return (
    <PageHeaderWrapper>
      <ProTable<CampusItem>
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {

              handleModalVisible(true)
            }}
          >
            <PlusOutlined /> 新建校区
          </Button>,
        ]}
        actionRef={actionRef}
        rowKey="campusName"
        headerTitle="校区管理"
        columns={columns}
        request={() => queryAllCampus()}
      />

      <ModalForm
        title='新建校区'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as CampusItem);
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
              message: '校区名称',
            },
          ]}
          tooltip="校区名称不能为空"
          label="校区名称"
          width="md"
          name="campusName"
        />
        <ProFormText

          label="描述"
          width="md"
          name="description"
        />

      </ModalForm>
    </PageHeaderWrapper>

  );

};

export default CampusAdmin;
