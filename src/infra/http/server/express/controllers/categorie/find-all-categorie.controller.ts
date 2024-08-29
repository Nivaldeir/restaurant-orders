import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { ICategorieService } from "../../../../../../core/app/interfaces/services/categorie";

export class FindAllCategoriesController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ICategorieService
  ) {}
  getHandler(): (
    request: Request<any>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const findCategories = await this.service.findAll();
        response.status(200).json({
          message: "Category find with successfully",
          data: findCategories,
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
