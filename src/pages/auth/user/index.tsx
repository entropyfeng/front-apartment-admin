import React, {useState} from 'react';
import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {AuthUserItem} from '@/pages/auth/user/data';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

import {queryAllUsers, removeAuthUser} from '@/pages/auth/user/service';

import UserDetailForm from './components/UserDetailForm';
import ConfigContainRoles from '@/pages/auth/user/components/ConfigContainRoles';
import {Button, Divider, Dropdown, Menu, message, Modal} from 'antd';
import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {

  ProFormText,
  StepsForm
} from "@ant-design/pro-form";

/**
 *  删除用户
 * @param selectedRows
 */
const handleRemove = async (selectedRows: AuthUserItem[]) => {
  const hide = message.loading('正在删除用户');
  if (!selectedRows) return true;
  try {
    await removeAuthUser(
      selectedRows.map((row) => row.authUserId),
    );
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const TableList: React.FC<{}> = () => {
  const [createVisible, handleCreateVisible] = useState<boolean>(false);
  const [batchCreateVisible, handleBatchCreateVisible] = useState<boolean>(false);
  const [showDetailVisible, handleDetailVisible] = useState<boolean>(false);
  const [detailValues, setDetailValue] = useState({});
  const [authUserName, setAuthUserName] = useState<string>();
  const [authUserId, setAuthUserId] = useState<string>();
  const [showConfigVisible, handleConfigVisible] = useState<boolean>(false);
  const columns: ProColumns<AuthUserItem>[] = [
    {
      key: 'Id',
      title: 'Id',
      dataIndex: 'authUserId',
      hideInForm: true,
    },
    {
      key: 'authUserName',
      title: '用户',
      dataIndex: 'authUsername',
    },
    {
      key: 'updateTime',
      title: '更改时间',
      dataIndex: 'updateTime',
      hideInForm: true,
      valueType: 'dateTime',
    }, {

      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
      hideInForm: true,
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',

    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      hideInForm: true,
      valueType: 'dateTime',

    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
            handleDetailVisible(true);
            setDetailValue(record);
          }}
          >
            详情
          </a>
          <Divider type="vertical"/>

          <a onClick={() => {
            setAuthUserId(record.authUserId);
            setAuthUserName(record.authUsername);
            handleConfigVisible(true);

          }}
          >
            配置
          </a>
        </>

      ),
    },

  ];


  return (
    <PageHeaderWrapper>

      <ProTable<AuthUserItem>
        search={false}
        toolBarRender={(action, {selectedRows}) => [
          <Button key="addAuthUserButton" type="primary" onClick={() => handleCreateVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
          <Button key="batchAddAuthUserButton" type="primary" onClick={() => handleBatchCreateVisible(true)}>
            <PlusOutlined/> 批量新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              key="authRoleDropDown"
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined/>
              </Button>
            </Dropdown>
          ),
        ]}
        rowKey="authUserId"
        headerTitle="用户控制"
        columns={columns}
        rowSelection={{}}
        request={(params, sorter, filter) => queryAllUsers({...params, sorter, filter})}
      />

      <UserDetailForm values={detailValues} modalVisible={showDetailVisible}
                      onCancel={() => handleDetailVisible(false)}/>

      {authUserId != null && authUserName != null && showConfigVisible ? (
        <ConfigContainRoles authUserId={authUserId} authUserName={authUserName} modalVisible={showConfigVisible}
                            onSubmit={() => handleConfigVisible(false)} onCancel={() => handleConfigVisible(false)}/>
      ) : null
      }

      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          handleCreateVisible(false);
          message.success('提交成功');
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="创建用户"
              width={800}
              onCancel={() => handleCreateVisible(false)}
              visible={createVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="创建用户"
          onFinish={async () => {

            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="用户名"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{required: true}]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="设置参数">

          <ProFormText
            name="email"
            width="md"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[{required: true}]}
          />
          <ProFormText.Password
            label="密码"
            name="password"
          placeholder="请输入密码"
          >

          </ProFormText.Password>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="提交">

        </StepsForm.StepForm>
      </StepsForm>
    </PageHeaderWrapper>


  );
};

export default TableList;
