import React from "react";
import {Modal} from "antd";
import DormitoryAdmin from '@/pages/apartment/admin/dormitory';

type DormitoryListProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  buildingId: string;
  buildingName: string;
}

const DormitoryList: React.FC<DormitoryListProps> = (props) => {
  const { modalVisible, onCancel ,buildingName } = props;


  return( <Modal visible={modalVisible} width={1000}  onCancel={onCancel} >

      <DormitoryAdmin buildingName={buildingName}/>
  </Modal>
  );
};

export default DormitoryList;
