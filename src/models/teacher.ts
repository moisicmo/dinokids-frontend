import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface TeacherModel extends UserModel  {
  id: number;
}

export interface FormTeacherModel extends FormUserModel {
  phone: string;
}

export interface FormTeacherValidations extends FormUserValidations {
  phone: [(value: string) => boolean, string];
}

