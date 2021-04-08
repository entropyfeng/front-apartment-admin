import React, { useState} from 'react';
import {message, Modal} from 'antd';
import RoleTrans from '@/pages/auth/user/components/RoleTrans';
import {useRequest} from "@@/plugin-request/request";
import {updateRolesInUser} from "@/pages/auth/user/service";

type DetailFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  authUserName: string;
  authUserId: string;
}

export type ConfigRoleProp = {
  authRoleId: string;
  authRoleName: string;
  description: string;
  disabled: boolean;
  key: string;
}

function handleRes(tempData: any) {
  const dataSource: ConfigRoleProp[] = [];
  tempData.config_roles.forEach(
    (temp: { authRoleName: string; description: string; disabled: boolean; authRoleId: string }) => {
      dataSource.push({
        authRoleName: temp.authRoleName,
        description: temp.description,
        disabled: temp.disabled,
        authRoleId: temp.authRoleId,
        key: temp.authRoleId,
      })
    }
  );
  const initTargetKeys: string[] = [];

  tempData.current_role_ids.forEach((temp: string) => {
    initTargetKeys.push(temp)
  })
  return {dataSource, initTargetKeys}
}


/**
 * 修改
 * @param fields
 * @param authUserId
 */
const update = async (fields: string[],authUserId: string) => {
  const hide = message.loading('正在配置');
  try {
    await updateRolesInUser(fields,authUserId);
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const ConfigContainRoles: React.FC<DetailFormProps> = (props) => {

  const {modalVisible, onSubmit, onCancel, authUserName,authUserId} = props;

  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const {error, data, loading} = useRequest(`/api/auth/user/configRoles?userId=${authUserId}`)
  if (error) {
    return <div>failed to load</div>;
  }

  if (loading) {
    return <div>Loading </div>
  }

  return (
    <Modal
      width={1600}
      destroyOnClose
      title="配置角色"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => {
       const  res=update(targetKeys,authUserId)
        if (res){
          onSubmit();
        }else {
          onCancel();
        }

      }}
    >

      <RoleTrans {...handleRes(data)} targetKeys={targetKeys} authUserName={authUserName} setTargetKeys={setTargetKeys}/>
    </Modal>

  );
};


export default ConfigContainRoles;
