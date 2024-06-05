import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  categorySlice,
  inscriptionSlice,
  permissionSlice,
  roleSlice,
  staffSlice,
  studentSlice,
  subjectSlice,
  teacherSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    staffs: staffSlice.reducer,
    teachers: teacherSlice.reducer,
    students: studentSlice.reducer,
    inscriptions: inscriptionSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    categories: categorySlice.reducer,
    subjects: subjectSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
