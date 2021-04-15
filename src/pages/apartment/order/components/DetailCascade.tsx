import React from 'react';
import { Cascader } from 'antd';
import {
  acquireAvailableBuildingNamesUsingGET,
  acquireAvailableCampusGroupNamesUsingGET,
} from '@/services/swagger/orderDormitoryController';

interface DetailCascadeProps {

  setBuildingName: (buildingName: string) => void;
  names: string[];
}

const DetailCascade: React.FC<DetailCascadeProps>=(props)=>{

  const {names,setBuildingName}=props;
  const optionList: any[] | (() => any[])=[];
  names.forEach(name=>{
    optionList.push({
      value:name,
      label:name,
      isLeaf:false
    })
  });
  const [options, setOptions] = React.useState(optionList);
  // @ts-ignore
  const onChange = (value, selectedOptions) => {

    if (selectedOptions.length===3){
      const targetOption = selectedOptions[selectedOptions.length - 1];
      setBuildingName(targetOption.value);
    }
  };

  // @ts-ignore
  const loadData = selectedOptions => {

    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (selectedOptions.length===1){
      acquireAvailableCampusGroupNamesUsingGET({campusName:targetOption.value}).then((res)=>{

        const tempList: { value: any; label: any; isLeaf: boolean; }[]=[]
        // @ts-ignore
        res.data.names.forEach(name=>{
          tempList.push({
            value:name,
            label:name,
            isLeaf:false
          })
        });


        targetOption.loading=false;
        targetOption.children = tempList
        setOptions([...options]);
      })
    }else if(selectedOptions.length===2){
      acquireAvailableBuildingNamesUsingGET({campusGroupName:targetOption.value}).then(res=>{
        const tempList: { value: any; label: any; isLeaf: boolean; }[]=[]
        // @ts-ignore
        res.data.names.forEach(name=>{
          tempList.push({
            value:name,
            label:name,
            isLeaf:true
          })
        });
        targetOption.loading=false;
        targetOption.children = tempList
        setOptions([...options]);
      })

    }

  };

  return (
    <Cascader options={options}  loadData={loadData} onChange={onChange} changeOnSelect />
  );

};

export default DetailCascade;
