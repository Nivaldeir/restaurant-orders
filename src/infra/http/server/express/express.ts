import { Server } from "../server";
import express from "express";
import { Controller } from "./controllers/controler";
import Logger from "../../../logger";
export class Express implements Server {
  private _server: express.Express;
  constructor(controllers: Controller[]) {
    this._server = express();
    this._server.use(express.json());
    this.addControllers(controllers);
  }
  start(port: number) {
    this._server.listen(port);
  }

  private addControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      const path = controller.getPath();
      const method = controller.getMethod();
      const handler = controller.getHandler();
      Logger.instance.debug(`${method.toUpperCase()} ${path}`);
      this._server[method](path, handler);
    });
  }
}
