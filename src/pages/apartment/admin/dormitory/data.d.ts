export type DormitoryItem = {
  dormitoryId: string;
  campusName: string;
  campusGroupName: string;
  buildingName: string;
  floor: number;
  dormitoryName: string;
  totalCapacity: number;
  currentCapacity: number;
  inGender: 'WOMAN'|'MAN'|'UNKNOWN';
  dormitoryDirection: 'UNKNOWN'|'WEST'|'EAST'|'NORTH'|'SOUTH';
  description: string;
  createTime: Date;
  updateTime: Date;
}
