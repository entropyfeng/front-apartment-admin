import React from 'react';
import 'antd/dist/antd.css';
import { Transfer, Table} from 'antd';
import { searchAllResourcesAndItContainsByRoleName } from '@/pages/auth/role/service';
import difference from 'lodash/difference';

interface ResourceTransferProp{
  authRoleName:string;
}
const columns = [

  {
    dataIndex: 'authResourceName',
    title: '权限名',
  },
  {
    dataIndex: 'description',
    title: '描述',
  },
];
class TableTransferTwo extends React.Component<ResourceTransferProp> {
  state = {
    dataSource: [],
    targetKeys:[],
    loading: false,
  };



  componentDidMount() {
    this.fetch();
  }


  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };


  fetch = () => {
    this.setState({ loading: true });
   const res= searchAllResourcesAndItContainsByRoleName(this.props.authRoleName);
   res.then(response=>{
     if (response.hasOwnProperty('success')&&response.success===true){
       this.setState({
         loading: false,
         targetKeys:response.params.resourceNames,
         dataSource:response.params.authResources
       })
     }
   })

  };

  render() {


    const { dataSource,targetKeys, loading } = this.state;

    return (

        <Transfer
          rowKey={record => record.authResourceName}
          dataSource={dataSource}
          titles={['Source', 'Target']}
          targetKeys={targetKeys}
          selectedKeys={targetKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}


          render={item => item.authResourceName}

          style={{ marginBottom: 16 }}
        />

    );
  }
}





export default TableTransferTwo;



