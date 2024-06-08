
export interface RoomModel {
  id: number;
  name: string;
}

export interface FormRoomModel {
  name: string;
}

export interface FormRoomValidations {
  name: [(value: string) => boolean, string];
}