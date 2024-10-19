import { StudentModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [] as StudentModel[],
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload.students;
    },
    setAddStudent: (state, action) => {
      state.students = [...state.students, action.payload.student];
    },
    setUpdateStudent: (state, action) => {
      state.students = [
        ...state.students.map((e) => {
          if (e.id === action.payload.student.id) {
            return {
              ...action.payload.student,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteStudent: (state, action) => {
      state.students = [
        ...state.students.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStudents,
  setAddStudent,
  setUpdateStudent,
  setDeleteStudent,
} = studentSlice.actions;
