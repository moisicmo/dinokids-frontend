import { InscriptionModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const inscriptionSlice = createSlice({
  name: 'inscription',
  initialState: {
    inscriptions: [] as InscriptionModel[],
  },
  reducers: {
    setInscriptions: (state, action) => {
      state.inscriptions = action.payload.inscriptions;
    },
    setAddInscription: (state, action) => {
      state.inscriptions = [...state.inscriptions, action.payload.inscription];
    },
    setUpdateInscription: (state, action) => {
      state.inscriptions = [
        ...state.inscriptions.map((e) => {
          if (e.id === action.payload.inscription.id) {
            return {
              ...action.payload.inscription,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteInscription: (state, action) => {
      state.inscriptions = [
        ...state.inscriptions.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setInscriptions,
  setAddInscription,
  setUpdateInscription,
  setDeleteInscription,
} = inscriptionSlice.actions;
