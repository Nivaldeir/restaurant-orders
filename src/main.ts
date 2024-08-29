import { PrismaClient } from "@prisma/client";
import { FactoryServices } from "./core/app/factory/factory-service";
import { Express } from "./infra/http/server/express/express";
import { ControllerFactory } from "./infra/http/server/express/factory/controller-factory";

const services = FactoryServices.create(new PrismaClient());
const controllers = ControllerFactory.createControllers(services);
const server = new Express(controllers);
server.start(3000);
