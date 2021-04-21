/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import { contains } from '@/utils/myUtil';

export default function access(initialState: { currentUser?: API.CurrentUserVo | undefined }) {
  const { currentUser } = initialState || {};


  return {
    canAdmin: currentUser && contains(currentUser.access,"admin"),
    canOnlyStudent: currentUser&&contains(currentUser.access,"student"),

  };
}
