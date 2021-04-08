import React from 'react';
import { Card, Spin } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const AccountSettings: React.FC<{}> = () => {
  const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');

    if (loading) {
    return <Spin />;
  }
    console.log(initialState?.currentUser)

  return (<Card>xx</Card>);
};

// @ts-ignore
export default AccountSettings
