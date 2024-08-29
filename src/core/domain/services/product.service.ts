import { IngredientRepository } from "../../app/interfaces/repositories/ingredient.repositorie";
import { ProductRepository } from "../../app/interfaces/repositories/product.repositorie";
import {
  InputCreateProductDTO,
  InputDeleteProductDTO,
  InputUpdaterProductDTO,
  IProductService,
  OutputCreateProductDTO,
} from "../../app/interfaces/services/product";
import { Product } from "../entitie/product";

export class ProductService implements IProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly ingredientRepository: IngredientRepository
  ) {}
  async create(data: InputCreateProductDTO): Promise<void> {
    const ingredients = data.ingredients?.map(async (ingredient) => {
      let getIngredient = await this.ingredientRepository.findById(ingredient);
      if (!getIngredient) {
        return;
      }
      return getIngredient;
    }) as any;
    const product = Product.create(
      data.name,
      data.price,
      data.categorieId,
      ingredients
    );
    await this.repository.create(product);
  }
  async findAll(): Promise<OutputCreateProductDTO[]> {
    const products = await this.repository.findAll();
    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        categorieId: product.categorieId,
        ingredients: product.ingredients,
      };
    });
  }
  async findById(id: string): Promise<OutputCreateProductDTO> {
    const product = await this.repository.findById(id);
    if (!product) {
    }
    return product;
  }
  async update(data: InputUpdaterProductDTO): Promise<void> {
    const product = await this.repository.findById(data.id);
    if (!product) {
      throw new Error("Product not found");
    }
    if (data.ingredients) {
      const ingredients = data.ingredients?.map(async (ingredient) => {
        let getIngredient = await this.ingredientRepository.findById(
          ingredient
        );
        if (!getIngredient) {
          return;
        }
        return getIngredient;
      }) as any;
      product.ingredients = ingredients;
    }
    await this.repository.update(product);
  }
  async delete(data: InputDeleteProductDTO): Promise<void> {
    const product = await this.repository.findById(data.id);
    if (!product) {
      throw new Error("Product not found");
    }
    await this.repository.delete(product.id);
  }
}
