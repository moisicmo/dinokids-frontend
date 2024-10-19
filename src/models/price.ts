/* Price OFFICE MODEL */
export interface PriceModel {
  id : number,
  createdAt : Date,
  updatedAt : Date,
  classesId : number,
  inscription : number,
  month : number,
  state : boolean,
}

/* FORM Price OFFICE MODEL */
export interface FormPriceModel {
  inscription : number,
  month : number,
}

/*FORM Price OFFICE VALIDATIONS */
export interface FormPriceValidations {
  inscription: [(value: number) => boolean, string];
  month: [(value: number) => boolean, string];
}