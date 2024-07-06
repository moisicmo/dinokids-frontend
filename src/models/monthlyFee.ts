import { StudentModel, InscriptionModel } from ".";

export interface MonthlyFeeModel {
  id : number;
  createdAt : Date;
  updatedAt : Date;
  inscriptionId  :    number;
  startDate :   Date;
  endDate:      Date;
  totalInscription: number;
  totalAmount:  number;
  amountPending:  number;
  studentId  :  number;
  amountPaid  : number;
  state  :     boolean;
  amount : number | null;
  transactionNumber: string | null;
  payMethod: string | null;
  student:{user:StudentModel};
  inscriptions:InscriptionModel;
}
export interface MonthlyFeeModelInscription {
  id : number;
  inscriptionId:number;
  amount: number | null;
  transactionNumber: string | null;
  payMethod: string | null;
  inscriptions:InscriptionModel;
}

export interface FormMonthlyFeeModelInscription {
  inscriptionId: number | null;
  amount: number | null;
  transactionNumber: string | null;
  payMethod: string | null;
}

export interface FormMonthlyFeeValidationsInscription {
  inscriptions: [(value: number) => boolean, string];
  amount:[(value: number) => boolean, string];
  transactionNumber: [(value: string) => boolean, string];
  payMethod: [(value: string) => boolean, string];
}


