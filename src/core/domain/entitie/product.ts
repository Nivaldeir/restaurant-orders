import { randomUUID } from "crypto";
import { Ingredient } from "./ingredient";

export type IProduct = {
  id: string;
  name: string;
  price: number;
  categorieId: string;
  ingredients?: Ingredient[];
};
export class Product {
  id: string;
  name: string;
  price: number;
  categorieId: string;
  ingredients: Ingredient[] = [];
  constructor(props: IProduct) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.categorieId = props.categorieId;
    this.ingredients = props.ingredients || [];
  }
  static create(
    name: string,
    price: number,
    categorieId: string,
    ingredients?: Ingredient[]
  ) {
    return new Product({
      id: randomUUID(),
      name,
      categorieId,
      price,
      ingredients,
    });
  }
}
