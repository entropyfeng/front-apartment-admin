export const convertDirection=(dir: string): string =>{

  switch (dir) {
    case 'SOUTH':return '南';
    case 'NORTH':return '北';
    case 'EAST':return '东';
    case 'WEST':return '西';
    default :return '未知';
  }
}
export const convertStudentAccountStatus=(dir: string): string =>{

  switch (dir) {
    case 'EXIST':return '存在';
    case 'NOT_EXIST':return '不存在';
    default :return '未知';
  }
}
// @ts-ignore
export  const  base64ToUint8Array=(base64String: string) =>{
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export  const  contains=(arr: string[]|undefined, obj: string|undefined) =>{
  if (arr&&obj){
    let i = arr.length;
    // eslint-disable-next-line no-plusplus
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
  }

  return false;
}
