import { ProductsHistoricRepository } from './repositories/products-historic.implementation';
import { IProductsHistoricRepository } from './repositories/products-historic.repository';
import { IProductsHistoricService } from './services/products-historic.interface';
import { ProductsHistoricService } from './services/products-historic.service';

export const ProductsHistoricProvider = [
  {
    provide: IProductsHistoricRepository,
    useClass: ProductsHistoricRepository,
  },
  { provide: IProductsHistoricService, useClass: ProductsHistoricService },
];
