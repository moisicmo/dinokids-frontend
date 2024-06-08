import { createSlice } from '@reduxjs/toolkit';
import { BranchModel } from '../../models';

export const branchOfficeSlice = createSlice({
  name: 'branchOffice',
  initialState: {
    branchOffices: [] as BranchModel[],
  },
  reducers: {
    //branchOffice
    setbranchOffices: (state, action) => {
      state.branchOffices = action.payload.branchOffices;
    },
    setAddbranchOffice: (state, action) => {
      state.branchOffices = [...state.branchOffices, action.payload.branchOffice];
    },
    setUpdatebranchOffice: (state, action) => {
      state.branchOffices = [...state.branchOffices.map((e) => {
        if (e.id === action.payload.branchOffice.id) {
          return {
            ...action.payload.branchOffice
          }
        }
        return e
      })];
    },
    setDeletebranchOffice: (state, action) => {
      state.branchOffices = [...state.branchOffices.filter(e => e.id != action.payload.id)];
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  //branchOffices
  setbranchOffices,
  setAddbranchOffice,
  setUpdatebranchOffice,
  setDeletebranchOffice,
} = branchOfficeSlice.actions;