import { ModuleModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    modules: [] as ModuleModel[],
  },
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload.modules;
    },
    setAddModule: (state, action) => {
      state.modules = [...state.modules, action.payload.module];
    },
    setUpdateModule: (state, action) => {
      state.modules = [
        ...state.modules.map((e) => {
          if (e.id === action.payload.module.id) {
            return {
              ...action.payload.module,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteModule: (state, action) => {
      state.modules = [
        ...state.modules.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setModules,
  setAddModule,
  setUpdateModule,
  setDeleteModule,
} = moduleSlice.actions;
