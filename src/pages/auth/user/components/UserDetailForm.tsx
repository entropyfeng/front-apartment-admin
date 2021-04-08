
import React from 'react';
import { Card, Modal } from 'antd';
import { AuthUserItem } from '@/pages/auth/user/data';



interface DetailFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<AuthUserItem>;
}

const DetailForm: React.FC<DetailFormProps> = (props) => {
  const { modalVisible, onCancel  } = props;

  return (
    <Modal
      destroyOnClose
      title="配置角色"
      visible={modalVisible}
      onCancel={() => onCancel()}
    >
      <Card bordered={false}/>

    </Modal>
  );
};

export default DetailForm;
