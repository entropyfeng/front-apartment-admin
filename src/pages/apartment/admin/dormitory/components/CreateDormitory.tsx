import ProForm, { ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import React, { useState } from 'react';
import { message, Modal } from 'antd';
import SelectBuildingCascade from '@/pages/apartment/order/components/SelectBuildingCascade';
import { addSingleDormitoryUsingPOST } from '@/services/swagger/dormitoryController';
import type { DormitoryItem } from '@/pages/apartment/admin/building/components/data';


type CreateDormitoryProps = {
  visible: boolean;
  onVisibleChange: (temp: boolean) => void
}

const CreateDormitory: React.FC<CreateDormitoryProps> = (props) => {


  const { visible, onVisibleChange } = props;
  const [buildingName, setBuildingName] = useState<string>();
  const handleAdd = async (fields: DormitoryItem) => {

    const hide = message.loading('正在添加');
    try {
      await addSingleDormitoryUsingPOST({description:fields.description,dormitoryName:fields.dormitoryName,buildingName:buildingName,floor:fields.floor,inGender:fields.inGender,totalCapacity:fields.totalCapacity,dormitoryDirection:fields.dormitoryDirection})
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
  return (
    <StepsForm
      onFinish={async (values) => {
        console.log(values);
        onVisibleChange(false);
        handleAdd(values as DormitoryItem);
        message.success('提交成功');
      }}
      formProps={{
        validateMessages: {
          required: '此项为必填项',
        },
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            title="分步表单"
            width={800}
            onCancel={() => onVisibleChange(false)}
            visible={visible}
            footer={submitter}
            destroyOnClose
          >
            {dom}
          </Modal>
        );
      }}
    >
      <StepsForm.StepForm
        name="base"
        title="选择楼名"
      >
        <SelectBuildingCascade setBuildingName={setBuildingName} />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="checkbox" title="设置参数">

        <ProFormText
          rules={[
            {
              required: true,
              message: '寝室名称',
            },
          ]}
          tooltip="寝室名称不能为空"
          label="寝室名称"
          width="md"
          name="dormitoryName"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '楼层',
            },
          ]}
          label="楼层"
          width="xs"
          name="floor"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '寝室最大容量',
            },
          ]}
          tooltip="寝室最大容量不能为空"
          label="寝室最大容量"
          width="xs"
          name="totalCapacity"
        />
        <ProForm.Group>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '性别不可为空',
              },
            ]}
            options={[
              {
                value: 'MAN',
                label: '男',
              }, {
                value: 'WOMAN',
                label: '女',
              }, {
                value: 'MIX',
                label: '混合',
              },
            ]}
            width="xs"
            name="inGender"
            label="性别"
          />
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '性别不可为空',
              },
            ]}
            options={[
              {
                value: 'NORTH',
                label: '北',
              }, {
                value: 'SOUTH',
                label: '南',
              }, {
                value: 'WEST',
                label: '西',
              },
              {
                value: 'EAST',
                label: '东',
              },
            ]}
            width="xs"
            name="dormitoryDirection"
            label="方位"
          />
        </ProForm.Group>
        <ProFormText

          label="描述"
          width="md"
          name="description"
        />

      </StepsForm.StepForm>
    </StepsForm>);
};
export default CreateDormitory;
