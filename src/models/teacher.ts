import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface TeacherModel extends UserModel  {
  id: number;
  ci: string;
}

export interface FormTeacherModel extends FormUserModel {
  ci: string;
}

export interface FormTeacherValidations extends FormUserValidations {
  ci: [(value: string) => boolean, string];
}

