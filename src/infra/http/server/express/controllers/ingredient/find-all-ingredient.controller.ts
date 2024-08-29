import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { IIngredientService } from "../../../../../../core/app/interfaces/services/ingredient";

export class FindAllIngredientsController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IIngredientService
  ) {}
  getHandler(): (
    request: Request<any>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const findAll = await this.service.findAll();

        response.status(200).json({
          message: "Table find with successfully",
          data: findAll,
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
