
export interface SucursalModel{
  id: number;
  name: string;
  code: string;
  city:string;
  address:string;
  phoneNumber:string;
  status:boolean;
  isPrimary:boolean;
}

export interface FormSucursalModel {
  name:string;
  code: string;
  city:string;
  address:string;
  phoneNumber:string;
  status:boolean;
  isPrimary:boolean;
}

export interface FormSucursalValidations {
  code: [(value: string) => boolean, string];
  name: [(value: string) => boolean, string];
  city: [(value: string) => boolean, string];
  address: [(value: string) => boolean, string];
  phoneNumber: [(value: string) => boolean, string];
}

