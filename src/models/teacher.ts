import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface TeacherModel extends UserModel  {
  id: number;
}

export interface FormTeacherModel extends FormUserModel {
}

export interface FormTeacherValidations extends FormUserValidations {
}

