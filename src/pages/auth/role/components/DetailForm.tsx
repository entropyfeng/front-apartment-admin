
import React from 'react';
import { Card, Modal } from 'antd';
import { AuthRoleItem } from '@/pages/auth/role/data';
import TreeTrans from "@/pages/auth/role/TreeTransfer";



interface DetailFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<AuthRoleItem>;
}

const DetailForm: React.FC<DetailFormProps> = (props) => {
  const { modalVisible, onCancel ,values } = props;

  function handleAuthRoleName(target:string|undefined){
    if (target){
      return target;
    }
      return '';

  }
  return (
    <Modal
      destroyOnClose
      title="查看资源"
      visible={modalVisible}
      onCancel={() => onCancel()}
    >

      <Card bordered={false}>
        <TreeTrans  authRoleName={handleAuthRoleName(values.authRoleName)} />
      </Card>


    </Modal>
  );
};

export default DetailForm;
