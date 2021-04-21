import React from 'react';
import { useRequest } from '@@/plugin-request/request';
import { acquireAvailableCampusNamesUsingGET } from '@/services/swagger/orderDormitoryController';
import MyCascade from '@/pages/apartment/order/components/DetailCascade';

interface SelectBuildingCascadeProps {

  setBuildingName: (buildingName: string) => void;
}

const SelectBuildingCascade: React.FC<SelectBuildingCascadeProps> = (props) => {

  const { setBuildingName } = props;
  const { data, error, loading } = useRequest(acquireAvailableCampusNamesUsingGET);


  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

// @ts-ignore
  return (<MyCascade names={data.names} setBuildingName={setBuildingName} />);
};

export default SelectBuildingCascade;
