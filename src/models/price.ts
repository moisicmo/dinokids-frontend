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
  classesId : number,
  inscription : number,
  month : number,
  state : boolean,
}

/*FORM Price OFFICE VALIDATIONS */
export interface FormPriceValidations {
  classesId: [(value: string) => boolean, number];
  inscription: [(value: string) => boolean, number];
  month: [(value: number) => boolean, number];
  state: [(value: number) => boolean, string];

}