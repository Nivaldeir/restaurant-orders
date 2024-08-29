import { CategorieRepository } from "../../app/interfaces/repositories/categorie.repositorie";
import {
  ICategorieService,
  InputCreateCategorieDTO,
  InputDeleteCategorieDTO,
  OutputCreateCategorieDTO,
} from "../../app/interfaces/services/categorie";
import { Categorie } from "../entitie/categorie";

export class CategorieService implements ICategorieService {
  constructor(private readonly repository: CategorieRepository) {}
  async create(data: InputCreateCategorieDTO): Promise<void> {
    const categorie = Categorie.create(data.name);
    await this.repository.create(categorie);
  }
  async findAll(): Promise<OutputCreateCategorieDTO[]> {
    const categories = await this.repository.findAll();
    return categories;
  }
  async delete(data: InputDeleteCategorieDTO): Promise<void> {
    const categorie = await this.repository.findById(data.id);
    if (!categorie) {
      throw new Error("Categorie not found");
    }
    await this.repository.delete(categorie);
  }
}
