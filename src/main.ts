import { PrismaClient } from "@prisma/client";
import { FactoryServices } from "./core/app/factory/factory-service";
import { Express } from "./infra/http/server/express/express";
import { ControllerFactory } from "./infra/http/server/express/factory/controller-factory";
import { CorsExtension } from "./infra/http/server/express/extensions/cors-extension";
import { SwaggerExtension } from "./infra/http/server/express/extensions/swagger-extension";

const services = FactoryServices.create(new PrismaClient());
const controllers = ControllerFactory.createControllers(services);
const server = new Express(controllers);
server.settings([new CorsExtension(), new SwaggerExtension()]);
server.start(3000);
