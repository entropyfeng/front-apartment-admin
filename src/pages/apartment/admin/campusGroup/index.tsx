import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import type { ProColumns , ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { CampusGroupItem } from '@/pages/apartment/admin/campusGroup/data';
import { queryAllCampusGroup } from '@/pages/apartment/admin/campusGroup/service';
import { Button, message } from 'antd';
import { acquireCurrentCampusNamesUsingGET } from '@/services/swagger/campusController';
import {
  addSingleCampusGroupUsingPOST,
  deleteSingleCampusGroupUsingDELETE,
} from '@/services/swagger/campusGroupController';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';


const handleSingleRemove = async (campusGroupName: string) => {
  const hide = message.loading('正在删除');
  if (!campusGroupName) return true;
  try {
    await deleteSingleCampusGroupUsingDELETE({ campusGroupName });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleAdd = async (fields: CampusGroupItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSingleCampusGroupUsingPOST({
      campusGroupName: fields.campusGroupName,
      campusName: fields.campusName,
      inGender: fields.inGender,
      description: fields.description,
    });
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


  const columns: ProColumns<CampusGroupItem>[] = [
    {
      key: 'campusGroupId',
      title: 'Id',
      dataIndex: 'campusGroupId',
      hideInForm: true,
    },
    {
      title: '校区名称',
      dataIndex: 'campusName',
      hideInForm: true,
    },
    {
      title: '校区组名称',
      dataIndex: 'campusGroupName',
      hideInForm: true,
    },

    {
      key: 'updateTime',
      title: '更改时间',
      dataIndex: 'updateTime',
      hideInForm: true,
      valueType: 'dateTime',
    }, {
      key: 'inGender',
      title: '入住性别',
      dataIndex: 'inGender',
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
    }, {
      key: 'option',
      title: '操作',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleSingleRemove(record.campusGroupName);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
      ],
    },

  ];
  return (
    <PageHeaderWrapper>
      <ProTable<CampusGroupItem>
        search={false}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {

              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建校区
          </Button>,
        ]}
        rowKey="campusGroupId"
        headerTitle="校区组管理"
        columns={columns}
        request={() => queryAllCampusGroup()}
      />
      <ModalForm
        title='新建校区组'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as CampusGroupItem);
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
              message: '校区组名称',
            },
          ]}
          tooltip="校区组名称不能为空"
          label="校区组名称"
          width="md"
          name="campusGroupName"
        />

        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'MAN',
                label: '男',
              }, {
                value: 'WOMAN',
                label: '女',
              }, {
                value: 'MIX',
                label: '混合',
              },
            ]}
            width="xs"
            name="inGender"
            label="性别"
          />
          <ProFormSelect
            request={
              () => acquireCurrentCampusNamesUsingGET().then(nameRes => {
                const res: any[] | PromiseLike<any[]> = [];
                nameRes?.data?.names.forEach((name: string) => {
                  res.push({
                    value: name, label: name,
                  });
                });
                return res;
              })

            }
            width="xs"
            name="campusName"
            label="校区名"
          />
        </ProForm.Group>
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
