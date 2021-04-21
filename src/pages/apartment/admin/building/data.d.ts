export type AddDormitoryItem={
  inGender: 'MAN'|'WOMAN'|'MIX'|'UNKNOWN';
  dormitoryName: string;
  totalCapacity: number;
  dormitoryDirection: 'UNKNOWN'|'WEST'|'EAST'|'NORTH'|'SOUTH';
  floor: number;
}

export type BuildingItem = {

  buildingId: string;
  buildingName: string;
  totalFloor: number;
  currentCapacity: number;
  totalDormitory: number;
  maxCapacity: number;
  inGender: 'MAN'|'WOMAN'|'MIX'|'UNKNOWN';
  campusName: string;
  campusGroupName: string;
  hasElevator: boolean;
  description: string;
  createTime: Date;
  updateTime: Date;
}

