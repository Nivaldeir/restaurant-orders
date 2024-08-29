export interface IPaymentService {
  create(data: InputCreatePaymentDTO): Promise<void>;
  findAll(): Promise<OutputFindAllPaymentDTO[]>;
  findById(id: string): Promise<OutputFindAllPaymentDTO>;
}
export type InputCreatePaymentDTO = {
  orderId: string;
  amount: number;
  method: string;
};

export type OutputFindAllPaymentDTO = {
  id: string;
  orderId: string;
  amount: number;
  method: string;
};