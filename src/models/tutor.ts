import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface TutorModel extends UserModel  {
  id: number;
  address: string;
}

export interface FormTutorModel extends FormUserModel {
  phone: string;
  address: string;
}

export interface FormTutorValidations extends FormUserValidations {
  phone: [(value: string) => boolean, string];
  address: [(value: string) => boolean, string];
}

