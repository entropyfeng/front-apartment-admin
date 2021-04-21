import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LockOutlined} from '@ant-design/icons';
import { resetMyPasswordUsingPUT } from '@/services/swagger/accountController';
import { message } from 'antd';

interface ModifyMyPasswordViewProp{
setVisible: (visible: boolean) => void
}

const ModifyMyPasswordView: React.FC<ModifyMyPasswordViewProp> = (props) => {

  const {setVisible}=props;
  return (
    <ProForm title="修改密码"  onFinish={async (values)=>{
      const hide = message.loading('正在修改');
      try {

        await  resetMyPasswordUsingPUT({prePassword:values.prePassword,postPassword:values.postPassword});
        hide();
        setVisible(false)
        message.success('删除成功，即将刷新');
        return true;
      } catch (error) {
        hide();
        message.error('修改失败，请重试');
        return false;
      }

    }}>

      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        name="prePassword"
        rules={[
          {
            required: true,
            message: '请输入原密码'
          },
        ]}
        placeholder="请输入原密码"
      />
      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        rules={[
          {
            required: true,
            message: '请输入新密码'
          },
        ]}
        name="postPassword"
        placeholder="请输入新密码"
      />

    </ProForm>
  );
}

export default ModifyMyPasswordView;
