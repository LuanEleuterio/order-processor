import { Inject, Injectable } from '@nestjs/common';
import { IProductsHistoricService } from './products-historic.interface';
import { IProductsHistoricRepository } from '../repositories/products-historic.repository';

@Injectable()
export class ProductsHistoricService implements IProductsHistoricService {
  constructor(
    @Inject(IProductsHistoricRepository)
    private readonly productsHistoricRepository: IProductsHistoricRepository,
  ) {}

  public async create(
    productHistoric: IProductsHistoricService.Create.Params,
  ): Promise<void> {
    this.productsHistoricRepository.create(productHistoric);
    return;
  }
}
