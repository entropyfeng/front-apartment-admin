import React from 'react';


import { AuthRoleItem } from '../data.d';

export interface FormValueType extends Partial<AuthRoleItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<AuthRoleItem>;
}


export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}



const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  if (props.updateModalVisible){
    console.log('on /auth/role/components/updateForms');
  }

  return <div>New Page</div>;
};

export default UpdateForm;
