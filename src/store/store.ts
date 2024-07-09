import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  branchOfficeSlice,
  categorySlice,
  inscriptionSlice,
  permissionSlice,
  roleSlice,
  roomSlice,
  staffSlice,
  studentSlice,
  subjectSlice,
  teacherSlice,
  monthlyFeeSlice,
  moduleSlice,
  classeSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    branchOffices: branchOfficeSlice.reducer,
    staffs: staffSlice.reducer,
    teachers: teacherSlice.reducer,
    students: studentSlice.reducer,
    inscriptions: inscriptionSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    categories: categorySlice.reducer,
    subjects: subjectSlice.reducer,
    classes: classeSlice.reducer,
    modules:moduleSlice.reducer,
    rooms: roomSlice.reducer,
    monthlyFees: monthlyFeeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
