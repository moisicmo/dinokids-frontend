import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  branchOfficeSlice,
  inscriptionSlice,
  permissionSlice,
  roleSlice,
  roomSlice,
  scheduleSlice,
  staffSlice,
  studentSlice,
  teacherSlice,
  tutorSlice,
  monthlyFeeSlice,
  specialtySlice,
  classeSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    branchOffices: branchOfficeSlice.reducer,
    staffs: staffSlice.reducer,
    teachers: teacherSlice.reducer,
    tutors: tutorSlice.reducer,
    students: studentSlice.reducer,
    inscriptions: inscriptionSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    classes: classeSlice.reducer,
    specialties:specialtySlice.reducer,
    rooms: roomSlice.reducer,
    schedules: scheduleSlice.reducer,
    monthlyFees: monthlyFeeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
