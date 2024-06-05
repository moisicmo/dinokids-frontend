import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface StudentModel extends UserModel {
  id: number;
  code: string;
}

export interface FormStudentModel extends FormUserModel {
  code: string;
}

export interface FormStudentValidations extends FormUserValidations {
  code: [(value: string) => boolean, string];
}

