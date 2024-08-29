import { CreateProductController } from "./infra/http/server/express/controllers/product/create-product.controller";
import { Express } from "./infra/http/server/express/express";

const createProduct = new CreateProductController("/product", "get");
const server = new Express([createProduct]);
server.start(3000);
