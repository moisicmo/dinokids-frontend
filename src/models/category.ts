
export interface CategoryModel {
  id: number;
  name: string;
}

export interface FormCategoryModel {
  name: string;
}

export interface FormCategoryValidations {
  name: [(value: string) => boolean, string];
}