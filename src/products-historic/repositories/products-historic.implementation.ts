import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ProductHistoric,
  ProductHistoricDocument,
} from '../entities/products-historic.entity';
import { IProductsHistoricRepository } from './products-historic.repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsHistoricRepository implements IProductsHistoricRepository {
  constructor(
    @InjectModel(ProductHistoric.name)
    private readonly model: Model<ProductHistoricDocument>,
  ) {}

  public async create(
    productHistoric: IProductsHistoricRepository.Create.Params,
  ): Promise<void> {
    await this.model.create(productHistoric);
    return;
  }
}
