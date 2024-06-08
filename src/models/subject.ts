import { CategoryModel } from ".";

export interface SubjectModel {
  id: number;
  name: string;
  code: string;
  category: CategoryModel;
}

export interface FormSubjectModel {
  name: string;
  code: string;
  category: CategoryModel|null;
}

export interface FormSubjectValidations {
  name: [(value: string) => boolean, string];
  code: [(value: string) => boolean, string];
  category: [(value: CategoryModel) => boolean, string];
}
