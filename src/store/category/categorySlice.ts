import { TypeProjectModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [] as TypeProjectModel[],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setAddCategory: (state, action) => {
      state.categories = [...state.categories, action.payload.category];
    },
    setUpdateCategory: (state, action) => {
      state.categories = [
        ...state.categories.map((e) => {
          if (e.id === action.payload.category.id) {
            return {
              ...action.payload.category,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteCategory: (state, action) => {
      state.categories = [
        ...state.categories.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategories,
  setAddCategory,
  setUpdateCategory,
  setDeleteCategory,
} = categorySlice.actions;
