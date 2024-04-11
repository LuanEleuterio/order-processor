import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { ProductHistoric } from 'src/entities/product-historic.entity';
import { User } from 'src/entities/user.entity';
import { chunkArray } from '../../utils/chunk-array.util';

interface Props {
  users: User[];
  orders: Order[];
  products: ProductHistoric[];
}

@Injectable()
export class DataSeedService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  public async seed(props: Props) {
    const { users, orders, products } = props;

    const chunkedOrders = chunkArray(orders, 500);
    const chunkedUsers = chunkArray(users, 500);
    const chunkedProducts = chunkArray(products, 500);

    await this.dataSource.query('PRAGMA foreign_keys = OFF;');

    await this.dataSource.transaction(async (db) => {
      for (const chunk of chunkedUsers) {
        await db.insert(User, chunk);
      }

      for (const chunk of chunkedProducts) {
        await db.insert(ProductHistoric, chunk);
      }

      for (const chunk of chunkedOrders) {
        await db.insert(Order, chunk);
      }
    });

    await this.dataSource.query('PRAGMA foreign_keys = ON;');

    return { message: 'Data has been seeded' };
  }
}
