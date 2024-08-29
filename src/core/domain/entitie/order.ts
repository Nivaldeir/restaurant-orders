import { randomUUID } from "crypto";
import { Table } from "./table";
import { Product } from "./product";
import { Ingredient } from "./ingredient";
import { Payment } from "./payment";
type IncrementProduct = {
  increment: Ingredient;
  product: Product;
  quantity: number;
};

export type IOrder = {
  id: string;
  table: Table;
  products: IncrementProduct[];
  startTimestamp: Date;
  endTimestamp?: Date;
  price: number;
  status: "open" | "closed";
  payment?: Payment;
};

export class Order {
  id: string;
  table: Table;
  products: IncrementProduct[];
  startTimestamp: Date;
  endTimestamp: Date | null = null;
  price: number;
  status: "open" | "closed";
  payment: Payment | null = null;

  constructor(props: IOrder) {
    this.id = props.id;
    this.products = props.products;
    this.table = props.table;
    this.startTimestamp = props.startTimestamp;
    this.price = props.price;
    this.status = props.status;
    this.endTimestamp = props.endTimestamp || null;
    this.payment = props.payment || null;
  }

  static create(table: Table) {
    return new Order({
      id: randomUUID(),
      products: [],
      table,
      startTimestamp: new Date(),
      price: 0,
      status: "open",
    });
  }

  private calculate() {
    this.price = this.products.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );
    this.price = parseFloat(this.price.toFixed(2));
  }

  addProduct(product: IncrementProduct) {
    if (this.status === "closed") {
      throw new Error("Cannot add products to a closed order.");
    }

    if (!this.products.some((p) => p.product.id === product.product.id)) {
      this.products.push(product);
      this.calculate();
    }
  }

  removeProduct(product: Product) {
    if (this.status === "closed") {
      throw new Error("Cannot remove products from a closed order.");
    }

    if (this.products.some((p) => p.product.id === product.id)) {
      this.products = this.products.filter((p) => p.product.id !== product.id);
      this.calculate();
    }
  }

  close() {
    if (this.status === "closed") {
      throw new Error("Order is already closed.");
    }
    this.endTimestamp = new Date();
    this.status = "closed";
    this.payment = Payment.create(this.price, "credit", this.id);
  }
}
