export type DormitoryItem={
  buildingId: string;
  buildingName: string;
  campusGroupName: string;
  campusName: string;
  createTime: Date;
  currentCapacity: number;
  currentUsernames: string;
  description: string;
  dormitoryDirection: "UNKNOWN"|"WEST"|"EAST"|"NORTH"|"SOUTH"
  dormitoryId: string;
  dormitoryName: string
  floor: number
  inGender: 'MAN'|'WOMAN'|'MIX'|'UNKNOWN';
  totalCapacity: number;
  updateTime: Date;

}
