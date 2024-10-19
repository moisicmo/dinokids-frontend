import { StaffModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staffs: [] as StaffModel[],
  },
  reducers: {
    setStaffs: (state, action) => {
      state.staffs = action.payload.staffs;
    },
    setAddStaff: (state, action) => {
      state.staffs = [...state.staffs, action.payload.staff];
    },
    setUpdateStaff: (state, action) => {
      state.staffs = [
        ...state.staffs.map((e) => {
          if (e.id === action.payload.staff.id) {
            return {
              ...action.payload.staff,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteStaff: (state, action) => {
      state.staffs = [
        ...state.staffs.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStaffs,
  setAddStaff,
  setUpdateStaff,
  setDeleteStaff,
} = staffSlice.actions;
