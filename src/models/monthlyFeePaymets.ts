
export interface MonthlyFeePaymentsModel {
  id : number;
  paymentDate : Date;
  commitmentDate : Date;
  amount  :    number;
  transactionNumber:string;
  isInscription:boolean;
  payMethod:string;
  monthlyFeeId:number;
  
}

