import { FormUserModel, FormUserValidations, TutorModel, UserModel } from ".";

export enum Gender {
  masculino = 'MALE',
  femenino = 'FEMALE',
}
export enum EducationLevel {
  primaria = 'PRIMARY',
  secundaria = 'SECONDARY',
}
export interface StudentModel extends UserModel {
  id: number;
  code: string;
  birthdate: Date;
  gender: Gender;
  school: string;
  grade: number;
  educationLevel: EducationLevel;
  tutors: TutorModel[]
}

export interface FormStudentModel extends FormUserModel {
  code: string;
  birthdate: Date|null;
  gender: Gender|null;
  school: string;
  grade: number;
  educationLevel: EducationLevel|null;
  tutors: TutorModel[];

}

export interface FormStudentValidations extends FormUserValidations {
  birthdate: [(value: Date[]) => boolean, string];
  gender: [(value: Gender) => boolean, string];
  school: [(value: string) => boolean, string];
  grade: [(value: number) => boolean, string];
  educationLevel: [(value: EducationLevel) => boolean, string];
  tutors: [(value: TutorModel[]) => boolean, string];
}

