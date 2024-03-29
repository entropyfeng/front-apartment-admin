import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { AuthRoleItem } from '@/pages/auth/role/data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { addAuthRole, queryAllRole, removeAuthRole } from '@/pages/auth/role/service';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import CreateForm from '@/pages/auth/role/components/CreateForm';
import { updateRule } from '@/pages/ListTableList/service';
import { FormValueType } from '@/pages/ListTableList/components/UpdateForm';
import UpdateForm from '@/pages/auth/role/components/UpdateForm';
import DetailForm from '@/pages/auth/role/components/DetailForm';

/**
 * 添加角色
 * @param fields
 */
const handleAdd = async (fields: AuthRoleItem) => {
  const hide = message.loading('正在添加');
  try {
    await addAuthRole({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除角色
 * @param selectedRows
 */
const handleRemove = async (selectedRows: AuthRoleItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeAuthRole({
      authRoleNames: selectedRows.map((row) => row.authRoleName),
    });
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [showDetailVisible, handleDetailVisible] = useState<boolean>(false);
  const [detailValues,setDetailValue]=useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<AuthRoleItem>[] = [
    {
      key: 'Id',
      title: 'Id',
      dataIndex: 'authRoleId',
      hideInForm: true,
    },
    {
      key: 'authRoleName',
      title: '角色名',
      dataIndex: 'authRoleName',
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

    },
    {
      key: 'updateTime',
      title: '更改时间',
      dataIndex: 'updateTime',
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
              setDetailValue(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />

          <a onClick={() => {

            handleDetailVisible(true);
            setDetailValue(record);
          }}
          >
            详情
          </a>
        </>
      ),
    },
  ];


  return (
    <PageHeaderWrapper>
      <ProTable<AuthRoleItem>
        search={false}
        headerTitle="角色控制"
        actionRef={actionRef}
        columns={columns}
        rowKey="authRoleId"
        key="authRoleTable"
        rowSelection={{}}
        toolBarRender={(action, { selectedRows }) => [
          <Button key="addAuthRoleButton" type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
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
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={(params, sorter, filter) => queryAllRole({ ...params, sorter, filter })}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<AuthRoleItem, AuthRoleItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<AuthRoleItem, AuthRoleItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {
        showDetailVisible && (
          <DetailForm values={detailValues} modalVisible={showDetailVisible} onCancel={() => handleDetailVisible(false)}/>
        )
      }

    </PageHeaderWrapper>

  );
};

export default TableList;
