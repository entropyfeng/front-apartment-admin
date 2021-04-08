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

  type CurrentUserVo = {
    access?: string;
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

  type LoginTo = {
    autoLogin?: boolean;
    password?: string;
    type?: string;
    username?: string;
  };

  type Message = {
    code?: number;
    data?: Record<string, any>;
    errorMessage?: string;
    msg?: string;
    subCode?: number;
    success?: boolean;
  };
}
