import React, {useEffect} from 'react';
import 'antd/dist/antd.css';

import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import { ConfigRoleProp } from '@/pages/auth/user/components/ConfigContainRoles';


interface RoleTransProps {
  authUserName:string;
  initTargetKeys:string[];
  targetKeys:string[];
  setTargetKeys: (keys: any)=>void;
  dataSource:ConfigRoleProp[];

}
const rightTableColumns = [
  {
    dataIndex: 'authRoleName',
    title: 'Name',
  },
];
const leftTableColumns = [
  {
    dataIndex: 'authRoleName',
    title: 'Name',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];


// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table rowKey='authRoleId'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);









const RoleTrans: React.FC<RoleTransProps> = (props) => {
  const { targetKeys ,dataSource,setTargetKeys,initTargetKeys} = props;
  useEffect(()=>{
    setTargetKeys(initTargetKeys);
  },[])
  return(  <TableTransfer
    dataSource={dataSource}
    targetKeys={targetKeys}
    onChange={setTargetKeys}
    filterOption={(inputValue: any, item: { title: string | any[]; tag: string | any[]; }) =>
      item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
    }
    leftColumns={leftTableColumns}
    rightColumns={rightTableColumns}
  />);
}
export default RoleTrans;
