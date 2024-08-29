import { Request, Response } from "express";
import {
  InputCreatePaymentDTO,
  IPaymentService,
} from "../../../../../../core/app/interfaces/services/payment";
import { Controller, HttpMethod, ResponseType } from "../controler";

export class CreatePaymentController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IPaymentService
  ) {}
  getHandler(): (
    request: Request<{}, {}, InputCreatePaymentDTO>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const { amount, method, orderId } = request.body;
        const created = await this.service.create({ amount, method, orderId });

        response.status(201).json({
          message: "Payment created successfully",
          data: created,
        });
      } catch (error) {
        response.status(500).json({
          message: "An error occurred",
          error: true,
        });
      }
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
