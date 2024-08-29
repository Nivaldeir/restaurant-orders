import { IngredientRepository } from "../../app/interfaces/repositories/ingredient.repositorie";
import {
  IIngredientService,
  InputCreateIngredientDTO,
  InputDeleteIngredientDTO,
  InputUpdateIngredientDTO,
  OutputFindAllIngredientDTO,
} from "../../app/interfaces/services/ingredient";
import { Ingredient } from "../entitie/ingredient";

export class IngretientService implements IIngredientService {
  constructor(private readonly repository: IngredientRepository) {}
  async create(data: InputCreateIngredientDTO): Promise<void> {
    const ingredient = Ingredient.create(data.name, data.price);
    await this.repository.create(ingredient);
  }
  async update(data: InputUpdateIngredientDTO): Promise<void> {
    const ingredient = await this.repository.findById(data.id);
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }
    await this.repository.update(ingredient);
  }
  async findAll(): Promise<OutputFindAllIngredientDTO[]> {
    const ingredients = await this.repository.getAll();
    return ingredients;
  }
  async delete(data: InputDeleteIngredientDTO): Promise<void> {
    const ingredient = await this.repository.findById(data.id);
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }
    await this.repository.delete(ingredient);
  }
}
