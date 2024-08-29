import { randomUUID } from "crypto";

export type IIngredient = {
  id: string;
  name: string;
  price: number;
};
export class Ingredient {
  id: string;
  name: string;
  price: number;
  constructor(props: IIngredient) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
  }
  static create(name: string, price: number) {
    return new Ingredient({
      id: randomUUID(),
      name,
      price,
    });
  }
}
