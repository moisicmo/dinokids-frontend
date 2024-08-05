export enum DayOfWeek {
  lunes = 'MONDAY',
  martes = 'TUESDAY',
  miercoles = 'WEDNESDAY',
  jueves = 'THURSDAY',
  viernes = 'FRIDAY',
  sabado = 'SATURDAY',
  domingo = 'SUNDAY',
}
export interface ScheduleModel {
  id: number;
  day: DayOfWeek;
  start: Date;
  end: Date;
}

export interface FormScheduleModel {
  day: DayOfWeek|null;
  start: Date|null;
  end: Date|null;
}

export interface FormScheduleValidations {
  day: [(value: DayOfWeek) => boolean, string];
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
}