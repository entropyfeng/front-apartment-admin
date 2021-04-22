import React from 'react';
import ProForm, {ProFormCaptcha, ProFormText} from '@ant-design/pro-form';
import { MailOutlined, MobileOutlined} from '@ant-design/icons';
import { message } from 'antd';

interface ModifyMyPhoneViewProp{
setVisible: (visible: boolean) => void
prePhone: string;
}

const ModifyMyPhoneView: React.FC<ModifyMyPhoneViewProp> = (props) => {

  const {setVisible,prePhone}=props;
  return (
    <ProForm
      onFinish={async () => {
        message.success('提交成功');
        setVisible(false);
      }}
    >

      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined />,
        }}
        name="phone"
        placeholder="请输入新手机号"
        rules={[
          {
            required: true,
            message: '请输入手机号!',
          },
          {
            pattern: /^1\d{10}$/,
            message: '不合法的手机号格式!',
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined />,
        }}
        captchaProps={{
          size: 'large',
        }}
        phoneName="phone"
        name="captcha"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
        placeholder="请输入验证码"
        onGetCaptcha={async (phone) => {

          message.success(`手机号 ${prePhone} 验证码发送成功!`);
        }}
      />
    </ProForm>
  );
}

export default ModifyMyPhoneView;
