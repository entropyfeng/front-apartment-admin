// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BuildingVO = {
    buildingId?: number;
    buildingName?: string;
    campusGroupName?: string;
    campusName?: string;
    createTime?: string;
    currentCapacity?: number;
    description?: string;
    hasElevator?: boolean;
    inGender?: string;
    maxCapacity?: number;
    totalDormitory?: number;
    totalFloor?: number;
    updateTime?: string;
  };

  type CollegeTo = {
    collegeName?: string;
    description?: string;
  };

  type CurrentUserVo = {
    access?: string[];
    avatar?: string;
    chinaIdNumber?: string;
    email?: string;
    group?: string;
    nickName?: string;
    phone?: string;
    signature?: string;
    title?: string;
    trueName?: string;
    unreadCount?: number;
    userid?: string;
    username?: string;
  };

  type DormitoryVO = {
    buildingName?: string;
    campusGroupName?: string;
    campusName?: string;
    createTime?: string;
    currentCapacity?: number;
    description?: string;
    dormitoryDirection?: string;
    dormitoryId?: string;
    dormitoryName?: string;
    floor?: number;
    hasElevator?: boolean;
    inGender?: string;
    totalCapacity?: number;
    updateTime?: string;
  };

  type LoginTo = {
    autoLogin?: boolean;
    password?: string;
    type?: string;
    username?: string;
  };

  type Message = {
    code?: number;
    data?: Record<string, any>;
    errorCode?: string;
    errorMessage?: string;
    msg?: string;
    subCode?: number;
    success?: boolean;
  };

  type StudentTo = {
    collegeName?: string;
    email?: string;
    gender?: string;
    idCardNumber?: string;
    phone?: string;
    registerYear?: string;
    studentId?: string;
    studentName?: string;
  };
}
