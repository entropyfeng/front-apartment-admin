import React from "react";
import {useRequest} from "@@/plugin-request/request";
import ProList from "@ant-design/pro-list";
import {Modal, Progress, Tag} from "antd";
import {DormitoryItem} from "@/pages/apartment/admin/building/components/data";
import {PageLoading} from "@ant-design/pro-layout";

type DormitoryListProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  buildingId: string;
  buildingName: string;
}
const temp=[]
const dataRes = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  key:item,
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [<a>邀请</a>],
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

const DormitoryList: React.FC<DormitoryListProps> = (props) => {
  const { modalVisible, onCancel,onSubmit,buildingId ,buildingName } = props;


  console.log(buildingId)
  const {error, data, loading} = useRequest(`/api/apartment/dormitory?buildingId=${buildingId}`);
  if (error) {
    return '<div/>'
  }

  if (loading) {
    return <PageLoading/>;
  }

  console.log(data.dormitories);

  const finalRes= data.dormitories.map((item: DormitoryItem) => ({

     dormitoryId:item.dormitoryId,
     title: <Tag color="#5BD8A6">{item.dormitoryName}</Tag>,
     subTitle: <Tag color="#5BD8A8">{`${item.floor}楼`}</Tag>,
     actions: [<a>详情</a>],
     content: (
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            width: 200,
          }}
        >
          <div>入住率</div>
          <Progress percent={item.currentCapacity/item.totalCapacity} />
        </div>
      </div>
    ),
   }));
  return( <Modal visible={modalVisible} width={1000}  onCancel={onCancel} >
      <ProList<any>
    /*    pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}*/
        grid={{ gutter: 100, column: 4 }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {},
          floor:{},
        }}
        key="dormitoryId"
        rowKey="dormitoryId"
        headerTitle={buildingName}
        dataSource={finalRes}
        renderItem={(item) => item}
      />
  </Modal>
  );
};

export default DormitoryList;
