import { BranchModel, StaffModel, StudentModel,MonthlyFeeModel, RoomModel, PriceModel } from ".";

export interface InscriptionModel {
  id: number;
  total: number;
  url: string;
  student:StudentModel;
  staff:StaffModel;
  monthlyFee: MonthlyFeeModel;
  rooms: RoomModel[];
  price: PriceModel;
}

export interface FormInscriptionModel {
  student:StudentModel|null;
  branch:BranchModel|null;
  rooms:RoomModel[];
  inscription:number;
  month:number;
}

export interface FormInscriptionValidations {
  student: [(value: StudentModel) => boolean, string];
  branch: [(value: BranchModel) => boolean, string];
  rooms: [(value: RoomModel[]) => boolean, string];
  inscription: [(value: number) => boolean, string];
  month: [(value:number) => boolean, string];
}


