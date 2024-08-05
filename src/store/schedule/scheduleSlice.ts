import { ScheduleModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedules: [] as ScheduleModel[],
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload.schedules;
    },
    setAddSchedule: (state, action) => {
      state.schedules = [...state.schedules, action.payload.schedule];
    },
    setUpdateSchedule: (state, action) => {
      state.schedules = [
        ...state.schedules.map((e) => {
          if (e.id === action.payload.schedule.id) {
            return {
              ...action.payload.schedule,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteSchedule: (state, action) => {
      state.schedules = [
        ...state.schedules.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSchedules,
  setAddSchedule,
  setUpdateSchedule,
  setDeleteSchedule,
} = scheduleSlice.actions;
