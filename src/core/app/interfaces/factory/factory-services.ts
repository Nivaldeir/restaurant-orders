import { IngretientService } from "../../../domain/services/ingretient.service";
import { ICategorieService } from "../services/categorie";
import { IPaymentService } from "../services/payment";
import { IProductService } from "../services/product";
import { ITableService } from "../services/table";

export interface IFactoryServices {
  categorie(): ICategorieService;
  ingredient(): IngretientService;
  payment(): IPaymentService;
  product(): IProductService;
  table(): ITableService;
}
