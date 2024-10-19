import { TeacherModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teachers: [] as TeacherModel[],
  },
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload.teachers;
    },
    setAddTeacher: (state, action) => {
      state.teachers = [...state.teachers, action.payload.teacher];
    },
    setUpdateTeacher: (state, action) => {
      state.teachers = [
        ...state.teachers.map((e) => {
          if (e.id === action.payload.teacher.id) {
            return {
              ...action.payload.teacher,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteTeacher: (state, action) => {
      state.teachers = [
        ...state.teachers.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTeachers,
  setAddTeacher,
  setUpdateTeacher,
  setDeleteTeacher,
} = teacherSlice.actions;
