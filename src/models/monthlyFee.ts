import { StudentModel, InscriptionModel, MonthlyFeePaymentsModel } from ".";

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
  payments:MonthlyFeePaymentsModel[];
}
export interface FormMonthlyFeeModel {
  inscriptionId: number | null;
  studentId: number | null;
  amountPaid: number | null;
  commitmentDate: Date | null;
  transactionNumber: string | null;
  isInscription: boolean;
  payMethod: string | null;
}
export interface FormMonthlyFeeValidations {
  inscriptions: [(value: number) => boolean, string];
  //studentId: [(value: number) => boolean, string];
  amountPaid:[(value: number) => boolean, string];
  commitmentDate: [(value: Date) => boolean, string];
  transactionNumber: [(value: string) => boolean, string];
  payMethod: [(value: string) => boolean, string];
}

// inscriptions
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
  buyerName:string | null;
  buyerNIT:string | null;
}


export interface FormMonthlyFeeValidationsInscription {
  inscriptions: [(value: number) => boolean, string];
  amount:[(value: number) => boolean, string];
  transactionNumber: [(value: string) => boolean, string];
  payMethod: [(value: string) => boolean, string];
  buyerName:[(value: string) => boolean, string];
  buyerNIT:[(value: string) => boolean, string];
  
}


