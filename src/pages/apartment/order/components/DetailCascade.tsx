import React from 'react';
import type { DormitoryItem } from '@/pages/apartment/admin/dormitory/data';
import { Cascader, Descriptions, Modal } from 'antd';
import { useRequest } from '@@/plugin-request/request';
import { acquireAvailableCampusGroupNamesUsingGET } from '@/services/swagger/orderDormitoryController';

interface DetailCascadeProps {

  names: string[];
}

const DetailCascade: React.FC<DetailCascadeProps>=(props)=>{

  const {names}=props;
  const optionList=[];
  names.forEach(name=>{
    optionList.push({
      value:name,
      label:name,
      isLeaf:false
    })
  });
  const [options, setOptions] = React.useState(optionList);
  const onChange = (value, selectedOptions) => {

   // console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {

    const targetOption = selectedOptions[selectedOptions.length - 1]; //selectedOptions.length指的是目前有几级
    console.log(targetOption.value)
    targetOption.loading = true;
    if (selectedOptions.length===1){
      acquireAvailableCampusGroupNamesUsingGET({campusName:targetOption.value}).then((res)=>{
        console.log(res)
        targetOption.loading=false;

      })
    }
    // load options lazily
    ajax('...',{value:selectedOptions.value}).then((res) => { //用选中的那一项的value给后端去请求下一级的数据，如果回来的数据带有isLeaf为false的标志，会自动再调用loadData方法
      targetOption.loading = false;
      targetOption.children = res.data //把请求到的数据放入targetOption
      setOptions([...options]);//目的是更新Cascader组件
    });
  };


  console.log(optionList)
  return (
    <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />
  );

};

export default DetailCascade;
