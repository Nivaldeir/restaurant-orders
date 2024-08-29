import { Request, Response } from "express";
import { ICategorieService } from "../../../../../../core/app/interfaces/services/categorie";
import { Controller, HttpMethod } from "../controler";
type InputResponse = {
  id: string;
};
export class DeleteCategorieController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ICategorieService
  ) {}
  getHandler(): (
    request: Request<InputResponse, {}, {}>,
    response: Response
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      const { id } = request.params;
      await this.service.delete({ id });
      response.status(200).send({
        error: false,
        message: "Categorie deleted successfully",
      });
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
