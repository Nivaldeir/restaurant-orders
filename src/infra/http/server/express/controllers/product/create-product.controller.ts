import { Request, Response } from "express";
import { Controller, HttpMethod } from "../controler";
import { IProductService } from "../../../../../../core/app/interfaces/services/product";

type InputResponse = {
  name: string;
  price: number;
  ingredients: string[];
  categorieId: string;
};
export class CreateProductController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IProductService
  ) {}
  getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (
      request: Request<{}, {}, InputResponse>,
      response: Response
    ) => {
      const { name, price, categorieId, ingredients } = request.body;
      await this.service.create({ name, price, categorieId, ingredients });
      response.status(201).send({
        error: false,
        message: "Produto criado com sucesso",
      });
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): "get" | "post" | "put" | "delete" {
    return this.method;
  }
}
