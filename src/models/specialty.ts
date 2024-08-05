import { RoomModel } from ".";

export interface SpecialtyModel {
  id: number;
  name: string;
  rooms: RoomModel[]
}

export interface FormSpecialtyModel {
  name: string;
}

export interface FormSpecialtyValidations {
  name: [(value: string) => boolean, string];
}
