import { BranchModel, SpecialtyModel, TeacherModel } from ".";

export interface RoomModel {
  id: number;
  name: string;
  capacity: number;
  rangeYears: number[];
  branch: BranchModel;
  teacher: TeacherModel;
  specialty: SpecialtyModel;
}

export interface FormRoomModel {
  name: string;
  capacity: number,
  rangeYears: number[],
  branch: BranchModel|null,
  teacher: TeacherModel|null,
  specialty: SpecialtyModel|null,
}

export interface FormRoomValidations {
  name: [(value: string) => boolean, string];
  capacity: [(value: number) => boolean, string];
  branch: [(value: BranchModel) => boolean, string];
  teacher: [(value: TeacherModel) => boolean, string];
  specialty: [(value: SpecialtyModel) => boolean, string];
}