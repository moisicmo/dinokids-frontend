import { StudentModel, PriceModel } from ".";

export interface MonthlyFeeModel {
  id : number,
  createdAt : Date,
  updatedAt : Date,
  priceId  :    number,
  startDate :   Date,
  endDate:      Date,
  totalAmount:  number,
  amountPending:  number,
  studentId  :  number,
  amountPaid  : number,
  state  :     boolean,
  student:{user:StudentModel};
  price:PriceModel;
}

export interface FormMonthlyFeeModel {
  student:StudentModel|null;
  price:PriceModel|null;
}

export interface FormMonthlyFeeValidations {
  student: [(value: StudentModel) => boolean, string];
  price: [(value: PriceModel) => boolean, string];
}


