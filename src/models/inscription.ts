import { BranchModel, StaffModel, StudentModel, MonthlyFeeModel, RoomModel, PriceModel, DayOfWeek, ScheduleModel } from ".";


export interface InscriptionRequired {
  student: StudentModel | null;
  branch: BranchModel | null;
  rooms: RoomModel[];
  inscription: number;
  month: number;
}

export interface AssignmentSchedule {
  id: number;
  day: DayOfWeek;
  schedule: ScheduleModel;
  assignmentRoomEntity: AssignmentRooms;
}

export interface AssignmentRooms {
  id: number;
  assignmentSchedule: AssignmentSchedule[];
  room: RoomModel;
  inscription: InscriptionModel;
}

export interface InscriptionModel {
  id: number;
  total: number;
  url: string;
  student: StudentModel;
  staff: StaffModel;
  monthlyFee: MonthlyFeeModel;
  price: PriceModel;
  assignmentRooms: AssignmentRooms[];
}

export interface FormInscriptionModel {
  student: StudentModel | null;
  branch: BranchModel | null;
  rooms: RoomModel[];
}

export interface FormInscriptionValidations {
  student: [(value: StudentModel) => boolean, string];
  branch: [(value: BranchModel) => boolean, string];
  rooms: [(value: RoomModel[]) => boolean, string];
}


