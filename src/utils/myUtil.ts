export const convertDirection=(dir: string): string =>{

  switch (dir) {
    case 'SOUTH':return '南';
    case 'NORTH':return '北';
    case 'EAST':return '东';
    case 'WEST':return '西';
    default :return '未知';
  }
}
