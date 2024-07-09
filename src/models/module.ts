import { SubjectModel } from ".";

export interface ModuleModel {
  id: number;
  subject: SubjectModel;
  name: string;
}

export interface FormModuleModel {
  name: string;
  subject: SubjectModel|null;
}

export interface FormModuleValidations {
  name: [(value: string) => boolean, string];
  subject: [(value: SubjectModel) => boolean, string];
}
