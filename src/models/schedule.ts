import { AssignmentSchedule } from ".";

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
  days: DayOfWeek[];
  start: Date;
  end: Date;
  assignmentSchedules:AssignmentSchedule[]
}

export interface FormScheduleModel {
  days: DayOfWeek[];
  start: Date|null;
  end: Date|null;
}

export interface FormScheduleValidations {
  days: [(value: DayOfWeek[]) => boolean, string];
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
}