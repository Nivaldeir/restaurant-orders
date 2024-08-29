import { Prisma, PrismaClient } from "@prisma/client";
import { IngretientService } from "../../domain/services/ingretient.service";
import { IFactoryServices } from "../interfaces/factory/factory-services";
import { CategorieRepository } from "../interfaces/repositories/categorie.repositorie";
import { IngredientRepository } from "../interfaces/repositories/ingredient.repositorie";
import { PaymentRepository } from "../interfaces/repositories/payment.repositorie";
import { ProductRepository } from "../interfaces/repositories/product.repositorie";
import { ICategorieService } from "../interfaces/services/categorie";
import { IPaymentService } from "../interfaces/services/payment";
import { IProductService } from "../interfaces/services/product";
import { ITableService } from "../interfaces/services/table";
import { CategorieService } from "../../domain/services/categorie.service";
import { CategorieDatabase } from "../../../infra/database/prisma/repository/categorie";
import { ProductDatabase } from "../../../infra/database/prisma/repository/product";
import { TableDatabase } from "../../../infra/database/prisma/repository/table";
import { PaymentDatabase } from "../../../infra/database/prisma/repository/payment";
import { PaymentService } from "../../domain/services/payment.service";
import { ProductService } from "../../domain/services/product.service";
import { TableService } from "../../domain/services/table.service";
import { TableRepository } from "../interfaces/repositories/table.repositorie";
import { IngrendientDatabase } from "../../../infra/database/prisma/repository/igrendient";

export class FactoryServices implements IFactoryServices {
  constructor(
    private readonly categorieRepository: CategorieRepository,
    private readonly productRepository: ProductRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly ingredientRepository: IngredientRepository,
    private readonly tableRepository: TableRepository
  ) {}
  static create(db: PrismaClient): IFactoryServices {
    const categorieDatabase = new CategorieDatabase(db);
    const productDatabase = new ProductDatabase(db);
    const tableDatabase = new TableDatabase(db);
    const paymentDatabase = new PaymentDatabase(db);
    const ingredientDatabase = new IngrendientDatabase(db);

    return new FactoryServices(
      categorieDatabase,
      productDatabase,
      paymentDatabase,
      ingredientDatabase,
      tableDatabase
    );
  }
  categorie(): ICategorieService {
    return new CategorieService(this.categorieRepository);
  }
  ingredient(): IngretientService {
    return new IngretientService(this.ingredientRepository);
  }
  payment(): IPaymentService {
    return new PaymentService(this.paymentRepository);
  }
  product(): IProductService {
    return new ProductService(
      this.productRepository,
      this.ingredientRepository
    );
  }
  table(): ITableService {
    return new TableService(this.tableRepository);
  }
}
