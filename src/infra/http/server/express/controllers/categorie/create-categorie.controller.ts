import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { ICategorieService } from "../../../../../../core/app/interfaces/services/categorie";

type InputResponse = {
  name: string;
};

export class CreateCategorieController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ICategorieService
  ) {}

  getHandler(): (
    request: Request<{}, {}, InputResponse, {}, Record<string, any>>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const { name } = request.body;
        const createdCategory = await this.service.create({ name });

        response.status(201).json({
          message: "Category created successfully",
          data: createdCategory,
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
