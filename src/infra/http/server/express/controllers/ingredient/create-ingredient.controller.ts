import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import {
  IIngredientService,
  InputCreateIngredientDTO,
} from "../../../../../../core/app/interfaces/services/ingredient";

export class CreateIngredientController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IIngredientService
  ) {}
  getHandler(): (
    request: Request<{}, {}, InputCreateIngredientDTO>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const { name, price } = request.body;
        const created = await this.service.create({ name, price });
        response.status(201).json({
          message: "Ingredient created successfully",
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
