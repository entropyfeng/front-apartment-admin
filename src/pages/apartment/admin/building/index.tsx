import React, { useRef, useState } from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import type {  BuildingItem } from '@/pages/apartment/admin/building/data';
import {queryAllBuilding} from "@/pages/apartment/admin/building/service";

import { Button, Divider, message } from 'antd';
import DormitoryList from "@/pages/apartment/admin/building/components/DormitoryList";
import { PlusOutlined } from '@ant-design/icons';

import { addNewBuildingUsingPOST, deleteSingleBuildingUsingDELETE } from '@/services/swagger/buildingController';
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { acquireCurrentCampusGroupNamesUsingGET } from '@/services/swagger/campusGroupController';

const handleSingleRemove = async (buildingName: string) => {
  const hide = message.loading('正在删除');
  if (!buildingName) return true;
  try {
    await deleteSingleBuildingUsingDELETE({buildingName})
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleAdd = async (fields: BuildingItem) => {
  const hide = message.loading('正在添加');
  try {
    await addNewBuildingUsingPOST({campusGroupName:fields.campusGroupName,buildingName:fields.buildingName,inGender:fields.inGender,totalFloor:fields.totalFloor})
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const ApartmentAdmin: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [showDetailVisible, handleDetailVisible] = useState<boolean>(false);
  const [buildingId, setBuildingId] = useState<string>();
  const [buildingName,setBuildingName]=useState<string>();


  const columns: ProColumns<BuildingItem>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'buildingId',
      hideInForm: true,
    },
    {
      key: 'buildingName',
      title: '楼名',
      dataIndex: 'buildingName',
    },
    {
      key: 'campusName',
      title: '校区名称',
      dataIndex: 'campusName',
    },
    {
      key: 'campusGroupName',
      title: '校区组名称',
      dataIndex: 'campusGroupName',
    },
    {
      key: 'totalFloor',
      title: '总楼层',
      dataIndex: 'totalFloor',
    },
    {
      key: 'maxCapacity',
      title: '最大容量',
      dataIndex: 'maxCapacity',
    },
    {
      key: 'currentCapacity',
      title: '当前入住',
      dataIndex: 'currentCapacity',
    },
    {
      key:'inGender',
      title:'入住性别',
      dataIndex:'inGender',
      valueEnum: {
        'MAN': {
          text:'男',
          status: 'MAN',
        },
        'WOMAN': {
          text:'女',
          status: 'WOMAN',
        },
        'MIX': {
          text:'混合',
          status: 'MIX',
        },
        'UNKNOWN': {
          text: '未知',
          status: 'UNKNOWN',
        },
      },
    },
    {
      key:'hasElevator',
      title:'电梯',
      dataIndex:'hasElevator',
      valueEnum: {
        true: {
          text:'有电梯',
          status: true,
        },
        false: {
          text:'无电梯',
          status: false,
        },
      },
    },

    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',

    },  {
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

    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
            handleDetailVisible(true);
            setBuildingId(record.buildingId);
            setBuildingName(record.buildingName);

          }}
          >
            详情
          </a>
          <Divider type="vertical"/>
          <a onClick={()=>{
            handleSingleRemove(record.buildingName)
            if (actionRef.current) {
              actionRef.current.reload();
            }

          }}>
            删除
          </a>
        </>


      ),
    },

  ];

  return (
    <PageHeaderWrapper>
      <ProTable<BuildingItem>
        search={false}
        rowKey="buildingId"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {

              handleModalVisible(true)
            }}
          >
            <PlusOutlined /> 新建楼栋
          </Button>,
        ]}
        actionRef={actionRef}
        headerTitle="楼栋管理"
        columns={columns}
        request={() => queryAllBuilding()}
      />


      <ModalForm
        title='新建楼栋'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as BuildingItem);
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
              message: '楼栋名称',
            },
          ]}
          tooltip="楼栋名称不能为空"
          label="楼栋名称"
          width="md"
          name="buildingName"
        />
        <ProForm.Group>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '性别不可为空',
              },
            ]}
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
            options={[
              {
                value: 'true',
                label: '有电梯',
              }, {
                value: 'false',
                label: '无电梯',
              },
            ]}
            width="xs"
            name="hasElevator"
            label="电梯"
            rules={[
              {
                required: true,
                message: '电梯不可为空',
              },
            ]}
          />
          <ProFormText

            label="总楼层"
            width="xs"
            name="totalFloor"
            rules={[
              {
                required: true,
                message: '总楼层不可为空',
              },
            ]}
          />
          <ProFormSelect
            request={
              () => acquireCurrentCampusGroupNamesUsingGET().then(nameRes => {
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
            name="campusGroupName"
            label="校区组名"
            rules={[
              {
                required: true,
                message: '校区组不可为空',
              },
            ]}
          />
        </ProForm.Group>
        <ProFormText

          label="描述"
          width="md"
          name="description"
        />

      </ModalForm>
      { buildingId!=null&&buildingName!=null&&showDetailVisible&&<DormitoryList buildingName={buildingName} buildingId={buildingId} onCancel={()=>handleDetailVisible(false)}
                  onSubmit={()=>handleDetailVisible(false)}   modalVisible={showDetailVisible}/>}

    </PageHeaderWrapper>


  );

};

export default ApartmentAdmin;
