import { TutorModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    tutors: [] as TutorModel[],
  },
  reducers: {
    setTutors: (state, action) => {
      state.tutors = action.payload.tutors;
    },
    setAddTutor: (state, action) => {
      state.tutors = [...state.tutors, action.payload.tutor];
    },
    setUpdateTutor: (state, action) => {
      state.tutors = [
        ...state.tutors.map((e) => {
          if (e.id === action.payload.tutor.id) {
            return {
              ...action.payload.tutor,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteTutor: (state, action) => {
      state.tutors = [
        ...state.tutors.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTutors,
  setAddTutor,
  setUpdateTutor,
  setDeleteTutor,
} = tutorSlice.actions;
