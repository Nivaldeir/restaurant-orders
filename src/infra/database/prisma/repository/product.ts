import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../../../../core/app/interfaces/repositories/product.repositorie";
import { Product } from "../../../../core/domain/entitie/product";
import { Ingredient } from "../../../../core/domain/entitie/ingredient";

export class ProductDatabase implements ProductRepository {
  constructor(private readonly db: PrismaClient) {}
  async findAll(): Promise<Product[]> {
    const products = await this.db.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        categorieId: true,
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return products.map(
      (product) =>
        new Product({
          id: product.id,
          name: product.name,
          price: product.price,
          categorieId: product.categorieId,
          ingredients: product.ingredients.map(
            (productIngredient) =>
              new Ingredient({
                id: productIngredient.ingredient.id,
                name: productIngredient.ingredient.name,
                price: productIngredient.ingredient.price,
              })
          ),
        })
    );
  }
  async findById(id: string): Promise<Product> {
    const product = await this.db.product.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        categorieId: true,
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return new Product({
      categorieId: product.categorieId,
      id: product.id,
      name: product.name,
      price: product.price,
      ingredients: product.ingredients.map(
        (productIngredient) =>
          new Ingredient({
            id: productIngredient.ingredient.id,
            name: productIngredient.ingredient.name,
            price: productIngredient.ingredient.price,
          })
      ),
    });
  }
  async create(product: Product): Promise<Product> {
    const createdProduct = await this.db.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        categorieId: product.categorieId,
        ingredients: {
          create: product.ingredients.map((ingredient) => ({
            ingredientId: ingredient.id,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return new Product({
      id: createdProduct.id,
      name: createdProduct.name,
      price: createdProduct.price,
      categorieId: createdProduct.categorieId,
      ingredients: createdProduct.ingredients.map(
        (productIngredient) =>
          new Ingredient({
            id: productIngredient.ingredient.id,
            name: productIngredient.ingredient.name,
            price: productIngredient.ingredient.price,
          })
      ),
    });
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.db.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        price: product.price,
        categorieId: product.categorieId,
        ingredients: {
          set: product.ingredients.map((ingredient) => ingredient),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return new Product({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      categorieId: updatedProduct.categorieId,
      ingredients: updatedProduct.ingredients.map(
        (productIngredient) =>
          new Ingredient({
            id: productIngredient.ingredient.id,
            name: productIngredient.ingredient.name,
            price: productIngredient.ingredient.price,
          })
      ),
    });
  }

  // Método para deletar um produto
  async delete(id: string): Promise<void> {
    await this.db.product.delete({
      where: { id },
    });
  }
}
