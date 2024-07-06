import { MonthlyFeeModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const monthlyFeeSlice = createSlice({
  name: 'monthlyFees',
  initialState: {
    monthlyFees: [] as MonthlyFeeModel[],
  },
  reducers: {
    setMonthlyFee: (state, action) => {
      state.monthlyFees = action.payload.monthlyFees;
    },
    setAddMonthlyFee: (state, action) => {
      state.monthlyFees = [...state.monthlyFees, action.payload.monthlyFee];
    },
    setUpdateMonthlyFee: (state, action) => {
      state.monthlyFees = [
        ...state.monthlyFees.map((e) => {
          if (e.id === action.payload.monthlyFee.id) {
            return {
              ...action.payload.monthlyFee,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteMonthlyFee: (state, action) => {
      state.monthlyFees = [
        ...state.monthlyFees.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMonthlyFee,
  setAddMonthlyFee,
  setUpdateMonthlyFee,
  setDeleteMonthlyFee,
} = monthlyFeeSlice.actions;
