import React from 'react';
import {Bar} from '@ant-design/charts';
import {acquireApartmentBaseInfoUsingGET} from "@/services/swagger/apartmentInfoController";
import {useRequest} from "@@/plugin-request/request";
import {PageLoading} from "@ant-design/pro-layout";

type ApartmentBaseInfo = {

  bedNum: number;
  womanBedNum: number;
  manBedNum: number;
  buildingNum: number;
  campusNum: number;
  campusGroupNum: number;
  dormitoryNum: number;
  currentResident: number;

}
const WelcomePage: React.FC = () => {

  const {data , loading, error} = useRequest(() => acquireApartmentBaseInfoUsingGET());
  if (loading) {
    return <PageLoading/>
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const myData=data as ApartmentBaseInfo;
  const bedInfo=[{
    type:'男生床位',
    value:myData.manBedNum
  },{
    type:'女生床位',
    value:myData.womanBedNum
  },{
    type:'总床位',
    value: myData.bedNum
  },{
    type:'当前入住人数',
    value: myData.currentResident
  }];

  const bedConfig = {
    data: bedInfo,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: { position: 'top-left' },
  };
  return <Bar {...bedConfig} />;

};
export default WelcomePage;
