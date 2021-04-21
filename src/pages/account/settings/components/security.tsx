
import React, { Component, useState } from 'react';

import { List, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import ModifyMyPasswordView from '@/components/Util/modifyMyPassword';

type Unpacked<T> = T extends (infer U)[] ? U : T;



const SecurityView: React.FC = () => {

  const { initialState,refresh } = useModel('@@initialState');
  const [isRestPasswordVisible, setRestPasswordVisible] = useState<boolean>(false);

  // @ts-ignore
  const {currentUser}=initialState;

  const getData = () => [
    {
      title: '账户密码',
      description: '用户名',
      actions: [
        <a key="Modify" onClick={()=>{
          setRestPasswordVisible(true)
        }}>
          修改
        </a>,
      ],
    },
    {
      title: '当前手机',
      description: `已绑定手机: ${currentUser.phone}`,
      actions: [
        <a  key="Modify" onClick={()=>{

        }}>
       修改
        </a>,
      ],
    },
    {
      title: '当前邮箱',
      description: `已绑定邮箱: ${currentUser.email}`,
      actions: [
        <a key="Modify">
        修改
        </a>,
      ],
    },

  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <Modal title="修改密码" visible={isRestPasswordVisible} footer={null} onCancel={()=>{
        setRestPasswordVisible(false)
      }} onOk={()=>{setRestPasswordVisible(false)}}>
        <ModifyMyPasswordView setVisible={setRestPasswordVisible}/>
      </Modal>
    </>
  );
}


export default SecurityView;
