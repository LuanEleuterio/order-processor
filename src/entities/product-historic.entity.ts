import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

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
