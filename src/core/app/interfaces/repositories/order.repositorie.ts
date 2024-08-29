import { Order } from "../../../domain/entitie/order";

export interface OrderRepository {
  getAll(): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
}
