import { SpecialtyModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const specialtySlice = createSlice({
  name: 'specialty',
  initialState: {
    specialties: [] as SpecialtyModel[],
  },
  reducers: {
    setSpecialties: (state, action) => {
      state.specialties = action.payload.specialties;
    },
    setAddSpecialty: (state, action) => {
      state.specialties = [...state.specialties, action.payload.specialty];
    },
    setUpdateSpecialty: (state, action) => {
      state.specialties = [
        ...state.specialties.map((e) => {
          if (e.id === action.payload.specialty.id) {
            return {
              ...action.payload.specialty,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteSpecialty: (state, action) => {
      state.specialties = [
        ...state.specialties.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSpecialties,
  setAddSpecialty,
  setUpdateSpecialty,
  setDeleteSpecialty,
} = specialtySlice.actions;
