
export interface SubjectModel {
  id: number;
  name: string;
  code: string;
  semester: number;
}

export interface FormSubjectModel {
  name: string;
  code: string;
  semester: number;
}

export interface FormSubjectValidations {
  name: [(value: string) => boolean, string];
  code: [(value: string) => boolean, string];
  semester: [(value: number) => boolean, string];
}
