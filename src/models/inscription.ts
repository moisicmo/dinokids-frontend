import { BranchModel, StaffModel, StudentModel, SubjectModel } from ".";

export interface InscriptionModel {
  id: number;
  total: number;
  url: string;
  student:StudentModel;
  staff:StaffModel;
  branch: BranchModel;
  subject: SubjectModel;
}

export interface FormInscriptionModel {
  student:StudentModel|null;
  branch:BranchModel|null;
  subject:SubjectModel|null;
}

export interface FormInscriptionValidations {
  student: [(value: StudentModel) => boolean, string];
  branch: [(value: BranchModel) => boolean, string];
  subject: [(value: SubjectModel) => boolean, string];
}


