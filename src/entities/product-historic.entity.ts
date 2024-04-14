import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { SchemaFactory } from '@nestjs/mongoose';

@Entity()
export class ProductHistoric {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  product_id: number;

  @Column()
  order_id: number;

  @Column()
  value: string;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  constructor(props: ProductHistoric) {
    Object.assign(this, props);
  }
}

export const ProductHistoricSchema =
  SchemaFactory.createForClass(ProductHistoric);
