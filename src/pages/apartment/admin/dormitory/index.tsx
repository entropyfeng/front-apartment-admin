import React from 'react';
import {  PageHeaderWrapper } from '@ant-design/pro-layout';

import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {CampusItem} from "@/pages/apartment/admin/campus/data";
import {queryAllCampus} from "@/pages/apartment/admin/campus/service";
import type {DormitoryItem} from "@/pages/apartment/admin/dormitory/data";

const columns: ProColumns<DormitoryItem>[] = [
  {
    key: 'dormitoryId',
    title: '名称',
    dataIndex: 'dormitoryId',
    hideInForm: true,
  },
  {
    key: 'campusName',
    title: '校区名称',
    dataIndex: 'campusName',
    hideInForm: true,
  },
  {
    key: 'campusGroupName',
    title: '校区组名称',
    dataIndex: 'campusGroupName',
    hideInForm: true,
  },
  {
    key: 'buildingName',
    title: '楼名',
    dataIndex: 'buildingName',
    hideInForm: true,
  },
  {
    key: 'dormitoryName',
    title: '寝室名',
    dataIndex: 'dormitoryName',
    hideInForm: true,
  },
  {
    key: 'floor',
    title: '楼层',
    dataIndex: 'floor',
    hideInForm: true,
  },
  {
    key: 'totalCapacity',
    title: '总容量',
    dataIndex: 'totalCapacity',
    hideInForm: true,
  },
  {
    key: 'currentCapacity',
    title: '当前容量',
    dataIndex: 'currentCapacity',
    hideInForm: true,
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
    key:'dormitoryDirection',
    title:'朝向',
    dataIndex:'dormitoryDirection',
    valueEnum: {
      'WEST': {
        text:'西',
        status: 'WEST',
      },
      'EAST': {
        text:'东',
        status: 'EAST',
      },
      'NORTH': {
        text:'北',
        status: 'NORTH',
      },
      'SOUTH': {
        text:'南',
        status: 'SOUTH',
      },
      'UNKNOWN': {
        text: '未知',
        status: 'UNKNOWN',
      },
    },
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
  }

];

const CampusAdmin: React.FC = () => {


  return (
    <PageHeaderWrapper>
      <ProTable<DormitoryItem>

        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        rowKey="campusName"
        headerTitle="校区管理"
        columns={columns}
        request={() => queryAllCampus()}
      />
    </PageHeaderWrapper>

  );

};

export default CampusAdmin;
