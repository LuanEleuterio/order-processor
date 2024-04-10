import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { ProductHistoric } from 'src/entities/product-historic.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

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

    await this.dataSource.query('PRAGMA foreign_keys = OFF;');

    await this.dataSource.transaction(async (db) => {
      await Promise.all([
        users.map(async (user) => {
          const userToSave = await db.create(User, user);
          await db.save(User, userToSave);
        }),
        orders.map(async (order) => {
          const orderToSave = await db.create(Order, order);
          await db.save(Order, orderToSave);
        }),
        products.map(async (product) => {
          const productToSave = await db.create(ProductHistoric, product);
          await db.save(ProductHistoric, productToSave);
        }),
      ]);
    });

    await this.dataSource.query('PRAGMA foreign_keys = ON;');

    return { message: 'Data has been seeded' };
  }
}
