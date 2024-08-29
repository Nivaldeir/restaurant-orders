import { randomUUID } from "crypto";

export type IPayment = {
  id: string;
  amount: number;
  method: string;
  orderId: string;
};
export class Payment {
  id: string;
  orderId: string;
  amount: number;
  method: string;

  constructor(props: IPayment) {
    this.id = props.id;
    this.amount = props.amount;
    this.method = props.method;
    this.orderId = props.orderId;
  }
  static create(amount: number, method: string, orderId: string): Payment {
    return new Payment({
      id: randomUUID(),
      amount,
      orderId,
      method,
    });
  }
}
