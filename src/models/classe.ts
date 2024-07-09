import { ModuleModel, RoomModel, TeacherModel } from ".";

export interface ClasseModel {
  id: number;
  name: string;
  start: Date;
  end: Date;
  room: RoomModel;
  teacher: TeacherModel;
  module: ModuleModel;
}

export interface FormClasseModel {
  name: string;
  start: Date|null;
  end: Date|null;
  room: RoomModel|null;
  teacher: TeacherModel|null;
  module: ModuleModel|null;
}

export interface FormClasseValidations {
  name: [(value: string) => boolean, string];
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
  room: [(value: RoomModel) => boolean, string];
  teacher: [(value: TeacherModel) => boolean, string];
  module: [(value: ModuleModel) => boolean, string];
  inscription: [(value: number) => boolean, string];
  month: [(value: number) => boolean, string];
}
