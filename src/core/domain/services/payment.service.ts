import { PaymentRepository } from "../../app/interfaces/repositories/payment.repositorie";
import {
  InputCreatePaymentDTO,
  IPaymentService,
  OutputFindAllPaymentDTO,
} from "../../app/interfaces/services/payment";
import { Payment } from "../entitie/payment";

export class PaymentService implements IPaymentService {
  constructor(private readonly repository: PaymentRepository) {}
  async create(data: InputCreatePaymentDTO): Promise<void> {
    const payment = Payment.create(data.amount, data.method, data.orderId);
    await this.repository.create(payment);
  }
  async findAll(): Promise<OutputFindAllPaymentDTO[]> {
    const payments = await this.repository.findAll();
    return payments;
  }
  async findById(id: string): Promise<OutputFindAllPaymentDTO> {
    const payment = await this.repository.findbyId(id);
    return payment;
  }
}
