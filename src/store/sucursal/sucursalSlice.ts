import { SucursalModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const sucursalSlice = createSlice({
  name: 'sucursal',
  initialState: {
    sucursals: [] as SucursalModel[],
  },
  reducers: {
    setSucursals: (state, action) => {
      state.sucursals = action.payload.sucursals;
    },
    setAddSucursal: (state, action) => {
      state.sucursals = [...state.sucursals, action.payload.sucursal];
    },
    setUpdateSucursal: (state, action) => {
      state.sucursals = [
        ...state.sucursals.map((e) => {
          if (e.id === action.payload.sucursal.id) {
            return {
              ...action.payload.sucursal,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteSucursal: (state, action) => {
      state.sucursals = [
        ...state.sucursals.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSucursals,
  setAddSucursal,
  setUpdateSucursal,
  setDeleteSucursal,
} = sucursalSlice.actions;
