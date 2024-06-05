import { SubjectModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    subjects: [] as SubjectModel[],
  },
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload.subjects;
    },
    setAddSubject: (state, action) => {
      state.subjects = [...state.subjects, action.payload.subject];
    },
    setUpdateSubject: (state, action) => {
      state.subjects = [
        ...state.subjects.map((e) => {
          if (e.id === action.payload.subject.id) {
            return {
              ...action.payload.subject,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteSubject: (state, action) => {
      state.subjects = [
        ...state.subjects.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSubjects,
  setAddSubject,
  setUpdateSubject,
  setDeleteSubject,
} = subjectSlice.actions;
