import React, {useState} from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {BuildingItem} from "@/pages/apartment/admin/building/data";
import {queryAllBuilding} from "@/pages/apartment/admin/building/service";

import {Divider} from "antd";
import DormitoryList from "@/pages/apartment/admin/building/components/DormitoryList";

const ApartmentAdmin: React.FC = () => {
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
        </>

      ),
    },

  ];

  return (
    <PageHeaderWrapper>
      <ProTable<BuildingItem>
        search={false}
        rowKey="buildingId"
        headerTitle="楼栋管理"
        columns={columns}
        request={() => queryAllBuilding()}
      />
      { buildingId!=null&&buildingName!=null&&showDetailVisible&&<DormitoryList buildingName={buildingName} buildingId={buildingId} onCancel={()=>handleDetailVisible(false)}
                  onSubmit={()=>handleDetailVisible(false)}   modalVisible={showDetailVisible}/>}

    </PageHeaderWrapper>


  );

};

export default ApartmentAdmin;
