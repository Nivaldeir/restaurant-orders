import { PrismaClient } from "@prisma/client";
import { TableRepository } from "../../../../core/app/interfaces/repositories/table.repositorie";
import { Table } from "../../../../core/domain/entitie/table";
import { IngredientRepository } from "../../../../core/app/interfaces/repositories/ingredient.repositorie";
import { Ingredient } from "../../../../core/domain/entitie/ingredient";

export class IngrendientDatabase implements IngredientRepository {
  constructor(private readonly db: PrismaClient) {}
  getAll(): Promise<Ingredient[]> {
    throw new Error("Method not implemented.");
  }
  create(ingredient: Ingredient): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
  update(ingredient: Ingredient): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
  delete(ingredient: Ingredient): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
