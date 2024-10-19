import { RoomModel } from ".";

export interface SpecialtyModel {
  id: number;
  name: string;
  numberSessions: number;
  estimatedSessionCost: number;
  rooms: RoomModel[]
}

export interface FormSpecialtyModel {
  name: string;
  numberSessions: number;
  estimatedSessionCost: number;
}

export interface FormSpecialtyValidations {
  name: [(value: string) => boolean, string];
  numberSessions: [(value: number) => boolean, string];
  estimatedSessionCost: [(value: number) => boolean, string];
}
