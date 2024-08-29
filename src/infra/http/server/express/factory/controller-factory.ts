import { IFactoryServices } from "../../../../../core/app/interfaces/factory/factory-services";
import { CreateCategorieController } from "../controllers/categorie/create-categorie.controller";
import { DeleteCategorieController } from "../controllers/categorie/delete-categorie.controller";
import { FindAllCategoriesController } from "../controllers/categorie/find-all-categorie.controller";
import { Controller } from "../controllers/controler";
import { CreateIngredientController } from "../controllers/ingredient/create-ingredient.controller";
import { FindAllIngredientsController } from "../controllers/ingredient/find-all-ingredient.controller";
import { CreatePaymentController } from "../controllers/payment/create-payment.controller";
import { FindAllPaymentController } from "../controllers/payment/find-all-payment.controller";
import { CreateProductController } from "../controllers/product/create-product.controller";

export class ControllerFactory {
  static createControllers(factoryService: IFactoryServices): Controller[] {
    const categorieService = factoryService.categorie();
    const ingredientService = factoryService.ingredient();
    const productsService = factoryService.product();
    const paymentService = factoryService.payment();

    return [
      new CreateProductController("/products", "post", productsService),
      new CreateCategorieController("/categories", "post", categorieService),
      new DeleteCategorieController("/categories/:id", "delete", categorieService),
      new FindAllCategoriesController("/categories", "get", categorieService),
      new CreateCategorieController("/categories", "post", categorieService),
      new CreateIngredientController("/ingredients", "post", ingredientService),
      new FindAllIngredientsController("/ingredients", "get", ingredientService),
      new CreatePaymentController("/payments", "post", paymentService),
      new FindAllPaymentController("/payments", "get", paymentService),
    ];
  }
}
