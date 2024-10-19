import { ClasseModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const classeSlice = createSlice({
  name: 'classe',
  initialState: {
    classes: [] as ClasseModel[],
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload.classes;
    },
    setAddClasse: (state, action) => {
      state.classes = [...state.classes, action.payload.classe];
    },
    setUpdateClasse: (state, action) => {
      state.classes = [
        ...state.classes.map((e) => {
          if (e.id === action.payload.classe.id) {
            return {
              ...action.payload.classe,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteClasse: (state, action) => {
      state.classes = [
        ...state.classes.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setClasses,
  setAddClasse,
  setUpdateClasse,
  setDeleteClasse,
} = classeSlice.actions;
