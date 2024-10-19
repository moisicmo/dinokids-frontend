/* BRANCH OFFICE MODEL */
export interface BranchModel {
  id: number;
  name: string;
  address: string;
  phone: number;
  state: boolean;
}

/* FORM BRANCH OFFICE MODEL */
export interface FormBranchModel {
  name: string;
  address: string;
  phone: number;
}

/*FORM BRANCH OFFICE VALIDATIONS */
export interface FormBranchValidations {
  name: [(value: string) => boolean, string];
  address: [(value: string) => boolean, string];
  phone: [(value: number) => boolean, string];
}