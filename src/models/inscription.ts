import { SeasonModel, StaffModel, StudentModel } from ".";

export interface InscriptionModel {
  id: number;
  total: number;
  amountDelivered: number;
  returnedAmount: number;
  url: string;
  student:StudentModel;
  staff:StaffModel;
  season:SeasonModel;
}

export interface FormInscriptionModel {
  amountDelivered: number;
  student:StudentModel|null;
}

export interface FormInscriptionValidations {
  amountDelivered: [(value: number) => boolean, string];
  student: [(value: StudentModel) => boolean, string];
}


